import jwksRsa from 'jwks-rsa';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import UserService from "./services/user_service";
import {TracksRequest} from "./tracks";

interface JWTEnhancedRequest extends Request {
	jwtClaims: {
		sub: string | null;
		roles: string[] | null;
		name: string | null;
		preferredUsername: string | null;
		email: string | null;
		hasRole: (string) => boolean;
	};

	tracksContext: {
		bestName: string;
		organization: number;
		subject: string | null;
		roles: string[] | null;
		hasRole: (string) => boolean;
	};
}

const jwksMiddleware = (options: { jwksUri: string }) => {

	const jwks = jwksRsa({
		jwksUri: options.jwksUri,
		cacheMaxAge: 3600,
		cache: true,
	});

	function retrieveKey(header, callback) {
		jwks.getSigningKey(header.kid, function (err, key) {
			if (err) {
				throw err;
			}

			const signingKey = key.getPublicKey();
			callback(null, signingKey);
		});
	}

	return {

		protect: (protectionOptions?: { requireRole?: string | null; requireAnyRole?: string[] | null; requireOrganizationMapping: boolean }) => (async (req: TracksRequest, response: Response, next: () => void) => {

			const authHeader = req.header('Authorization');
			if (!authHeader) {
				response.status(401).send();
			}

			const token = authHeader.split(/\s/)[1];

			if (!token) {
				response.status(401).send();
			}

			const q = new Promise((resolve, reject) => {
				jwt.verify(token, retrieveKey, {}, (err, decoded) => {
					if (err) {
						reject(err);
					} else {
						resolve(decoded);
					}
				});
			});

			try {
				const decoded: any = await q;

				req.jwtClaims = {
					sub: decoded.sub,
					roles: decoded.client_roles,
					name: decoded.name,
					preferredUsername: decoded.preferred_username,
					email: decoded.email,
					hasRole: (role) => (decoded.client_roles && decoded.client_roles.length > 0 && decoded.client_roles.includes(role))
				};

				const subject = decoded.sub;
				const roles = decoded.client_roles;

				// this name will be used for display. try a few in order of preference as not all tokens have all values.
				let bestName = decoded.preferred_username;

				if (decoded.name) {
					bestName = decoded.name;
				} else if (decoded.display_name) {
					bestName = decoded.display_name;
				} else if (decoded.bceid_username) {
					bestName = decoded.bceid_username;
				} else if (decoded.idir_username) {
					bestName = decoded.idir_username;
				}

				req.tracksContext = {
					bestName,
					hasRole: (role) => (roles && roles.length > 0 && roles.includes(role)),
					organization: await UserService.mapSubjectToOrganizationId(req.database.pool, subject),
					subject: subject,
					roles: roles,
				};

				if (protectionOptions && protectionOptions.requireRole) {
					if (!req.tracksContext.hasRole(protectionOptions.requireRole)) {
						response.status(401).send();
						return;
					}
				}


				if (protectionOptions && protectionOptions.requireAnyRole) {
					let passed = false;
					for (const r of protectionOptions.requireAnyRole) {
						if (req.tracksContext.hasRole(r)) {
							passed = true;
							break;
						}
					}

					if (!passed) {
						response.status(401).send();
						return;
					}

				}


				if (protectionOptions && protectionOptions.requireOrganizationMapping) {
					if (!req.tracksContext.organization) {
						response.status(401).send();
						return;
					}
				}

				next();
			} catch (err) {
				console.dir(err);
				response.status(401).send();
			}
		})
	};

};

export {jwksMiddleware, JWTEnhancedRequest};
