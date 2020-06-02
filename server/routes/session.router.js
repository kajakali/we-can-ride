const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get(`/all`, rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "session" ORDER BY "id" DESC;`;
    pool.query(sqlText).then( (response) => {
        res.send( response.rows );
    }).catch( (error) => {
        console.log( 'Error getting all sessions', error );
        res.sendStatus( 500 );
    });
});

router.get(`/lessons/:session_id`, rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT "user"."first_name", "user"."last_name", "start_of_lesson", 
    ("start_of_lesson" + "length_of_lesson") AS "end_of_lesson", "length_of_lesson", "client",
     "slot"."id" AS "slot_id", "lesson_id", "expected_user", "skill"."title", EXTRACT (DOW FROM "day_of_week") AS "weekday" 
    FROM "session"
    LEFT JOIN "lesson" ON "session"."id" = "lesson"."session_id"
    LEFT JOIN "slot" ON "lesson"."id" = "slot"."lesson_id"
    JOIN "skill" ON "skill"."id" = "skill_needed"
    LEFT JOIN "user" ON "expected_user" = "user"."id"
    WHERE "session"."id" = $1
    ORDER BY "lesson_id";`;
    pool.query(sqlText, [req.params.session_id]).then( (response) => {
        res.send(response.rows );
    }).catch( (error) => {
        console.log( 'Error getting session slots', error );
        res.sendStatus( 500 );
    });
})

/**
 * POST route template
 */
router.post('/new', rejectUnauthenticated, (req, res) => {
  console.log(req.body.date, req.body.yearlong, req.body.length); //yearlong is a boolean
  let yearlong = 'session';
  if (req.body.yearlong === true){
    yearlong = 'yearlong'
  };
  let length = req.body.length + ' WEEKS';
  const sqlText = `INSERT INTO "session"
  ("start_date", "ready_to_publish", "session_type", "length_in_weeks") 
  VALUES( $1, FALSE, $2, $3) 
  RETURNING "id", "start_date", "ready_to_publish", "session_type", "length_in_weeks"
  ;
  `;
  pool.query(sqlText, [req.body.date, yearlong, length]).then( response => {
    console.log('response from database', response);
    res.sendStatus(200);
  }).catch( error => {
    console.log('error in adding session to database', error);
    res.sendStatus(500);
  });
});

router.put('/edit/:session_id', async (req, res, next) => {
  console.log('in the publish session router', req.params.session_id);
  res.sendStatus(200);
})

module.exports = router;