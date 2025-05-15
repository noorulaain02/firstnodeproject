var config = require('./dbconfig');
const sql = require('mssql')

async function GetStudent(){
    try{
        let pool = await sql.connect(config);
        let students = await pool.request().query("SELECT * from student");
        return students.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function SelectStudent(stdid){
    try{
        let pool = await sql.connect(config);
        let student= await pool.request()
        .input('STDID',sql.Int,stdid)
        .query("SELECT * FROM student WHERE StudentId=STDID");
        return student.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
module.exports={
    GetStudent:GetStudent,
    SelectStudent:SelectStudent
}