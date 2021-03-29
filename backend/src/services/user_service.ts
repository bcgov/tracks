import {pool} from "../database";

const UserService = {

  mapSubjectToOrganizationId: async (subject: string) => {

    const queryResult = await pool.query({
      text: 'select organization_id as id from user_mapping where sub = $1',
      values: [subject]
    });

    if (queryResult.rowCount === 0) {
      return null;
    }
    return queryResult.rows[0].id;
  }
}

export default UserService;
