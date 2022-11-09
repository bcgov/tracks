import {db} from './database';

// periodic maintenance tasks, intended to be run from a cronjob

async function purgeStaleRoleBindingRequests() {
    try {
        await db.query(`BEGIN TRANSACTION`);

        // delete old actioned or rejected rbrs
        await db.query(`delete
                        from role_binding_request
                        where created < now() - interval '14 days' and status <> 'PENDING'`);

        // delete any that already exist in the db (perhaps they were added manually)
        await db.query(`delete
                        from role_binding_request
                        where sub in (select sub from user_mapping)`);

        await db.query(`COMMIT`);
    } catch (e) {
        console.error(`caught an error while purging stale role binding requests`, e);
        await db.query(`ROLLBACK`);
        throw {message: `check logs for details`}
    }
}

console.log('starting maintenance run');

purgeStaleRoleBindingRequests().then(() => {
    console.log('maintenance run complete');
    process.exit(0);
}).catch(() => {
    console.error('maintenance run failed');
    process.exit(-1);
});