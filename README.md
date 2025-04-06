[nodemon] starting `node dist/index.js`
query: SELECT SCHEMA_NAME() AS "schema_name"
Server is running on port 3004
query: BEGIN TRANSACTION
query: DECLARE @OutputTable TABLE ("attemptId" int, "score" float, "attemptDate" datetime);

INSERT INTO "QUIZATTEMPT_LMS"("userId", "quizId", "score", "attemptDate") OUTPUT INSERTED."attemptId", INSERTED."score", INSERTED."attemptDate" INTO @OutputTable VALUES (@0, @1, @2, @3);

SELECT * FROM @OutputTable -- PARAMETERS: [{"value":1,"type":"int","params":[]},{"value":17,"type":"int","params":[]},{"value":0,"type":"float","params":[]},{"value":"2025-04-06T06:27:30.000Z","type":"datetime","params":[]}]
query failed: DECLARE @OutputTable TABLE ("attemptId" int, "score" float, "attemptDate" datetime);

INSERT INTO "QUIZATTEMPT_LMS"("userId", "quizId", "score", "attemptDate") OUTPUT INSERTED."attemptId", INSERTED."score", INSERTED."attemptDate" INTO @OutputTable VALUES (@0, @1, @2, @3);

SELECT * FROM @OutputTable -- PARAMETERS: [{"value":1,"type":"int","params":[]},{"value":17,"type":"int","params":[]},{"value":0,"type":"float","params":[]},{"value":"2025-04-06T06:27:30.000Z","type":"datetime","params":[]}]
error: QueryFailedError: Error: The INSERT statement conflicted with the FOREIGN KEY constraint "FK_d8fa325fd031815edeec6e94f4f". The conflict occurred in database "JIBE_Main_Training", table "dbo.USER_LMS", column 'userId'.
query: ROLLBACK
