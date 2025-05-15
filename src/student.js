import React from 'react';
import { variables } from './variables';

export class Student extends React.Component
{
    constructor(props){
        // constructor overloading with the super method 
        // it will be automatically set to the student table
        super(props);
        this.state = {
            students:[],
            StudentId:0,
            ModalTitle:"",
            StudentRegNo:"",
            StudentName:"",
            ContactNo:"",
            Email:"",
            Status:0
        }
    }


    refreshList(){
        fetch(variables.API_URL + 'student')
        // .then methods are promises after the fetch url
        .then(response=>response.json())
        .then(data=>{this.setState({students:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    //add properties

 //   changeStudentId= (e)=>{
   //     this.setState({StudentRegId:e.target.value});
   // }
    changeStudentRegNo= (e)=>{
        this.setState({StudentRegNo:e.target.value});
    }

    changeStudentName= (e)=>{
        this.setState({StudentName:e.target.value});
    }

    changeContactNo= (e)=>{
        this.setState({ContactNo:e.target.value});
    }

    changeEmail= (e)=>{
        this.setState({Email:e.target.value});
    }
 //   changeStatus= (e)=>{
   //     this.setState({Status:e.target.value});
   // }

    addClick(){
        this.setState ({
            modalTitle:'Add Student',
            StudentId:0,
            StudentRegNo:"",
            StudentName:"",
            ContactNo:"",
            Email:""
        });
    }
    editClick(s)
    {
        this.setState({
            modalTitle:'Edit Student',
            StudentId:s.StudentId,
            StudentRegNo:s.StudentRegNo,
            StudentName:s.StudentName,
            ContactNo:s.ContactNo,
            Email: s.Email,
        });
    }
    createClick()
    {
        fetch(variables.API_URL+'student',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentRegNo:this.state.StudentRegNo,
                studentId: 0,
                studentName: this.state.StudentName,
                contactNo: this.state.ContactNo,
                email: this.state.Email,
                status: 0,
                returnMessage: "OK"
            })
            })
            .then(response=>response.json())
            .then((result)=>{
                alert(result);
                console.log(result);
                this.refreshList();
            },(error)=>{
                console.log(error);
                alert('Failed');
            })
     }

        updateClick(){
            fetch(variables.API_URL+'student',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    StudentId:this.state.StudentId,
                    StudentRegNo:this.state.StudentRegNo,
                    StudentName:this.state.StudentName,
                    ContactNo:this.state.ContactNo,
                    Email: this.state.Email,
                    status: 0,
                    returnMessage: "OK"
            
                })
                })
                .then(response=>response.json())
                .then((result)=>{
                    alert(result);
                    this.refreshList();
                },(error)=>{
                    alert('Failed');
                });
            }
            deleteClick(s){
                if(window.confirm('Are you Sure to Delete?')) {
                    fetch(variables.API_URL+'student',
                    {method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        StudentId:s.StudentId,
                        studentRegNo: "string",
                        studentName: "string",
                        contactNo: "string",
                        email: "string",
                        status: 0,
                        returnMessage: "ok"
                    })
                    })
                    .then(response=>response.json())
                    .then((result)=>{
                        alert(result);
                        this.refreshList();
                    },(error)=>{
                        alert('Failed');
                    });
                }
            }
        

    render()
    {
        const {
            students,
            modalTitle,
            StudentId,
            StudentRegNo,
            StudentName,
            ContactNo,
            Email,
            Status
        } = this.state;

        // jo cheez render kay ander hogi woh browser main chalna hojaey gi
        return(
            <div>
                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target="#exampleModal" 
                onClick={() => this.addClick()} > Add Student
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th> Student Id </th>
                        <th> Student Reg No </th>
                        <th> Student Name</th>
                        <th> Contact No </th>
                        <th> Email</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s =>
                                <tr key={s.StudentId}>
                                    <td>{s.StudentId}</td>
                                    <td>{s.StudentRegNo}</td>
                                    <td>{s.StudentName}</td>
                                    <td>{s.ContactNo}</td>
                                    <td>{s.Email}</td>
                                    
                                    <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(s)}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor"className="bibi-pencil-square"viewBox="0 0 16 16">  
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    </button>
                                    <button type="button"className="btn btn-light mr-1"onClick={()=>this.deleteClick(s)}>
                                        <svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"fill="currentColor"className="bi bi-trash-fill"viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                        </button>

                                    </td>
                                </tr>   
                        )};
                    </tbody>
                    </table>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg  modal-dialog-centered">
                            <div className="modal-content">
                                <div class="modal-header">
                                    <h5 className="modal-title" >{modalTitle}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
        
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"> Student Reg Number</span>
                                        <input type="text" className="form-control" value={StudentRegNo} onChange={this.changeStudentRegNo}/>    
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"> Student Name</span>
                                        <input type="text" className="form-control" value={StudentName} onChange={this.changeStudentName}/>    
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"> Contact No</span>
                                        <input type="text" className="form-control" value={ContactNo} onChange={this.changeContactNo}/>   
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"> Email </span>
                                        <input type="text" className="form-control" value={Email} onChange={this.changeEmail}/>     
                                    </div>
                                   

                                    {
                                    StudentId ===0?
                                    <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={()=>this.createClick()}
                                    >Create</button>
                                    :null
                                    }
                                    {
                                    StudentId!==0?
                                    <button type="button"
                                    className="btn btn-warning float-start"
                                    onClick={()=>this.updateClick()}
                                    >Update</button>
                                    :null
                                    
                                    }



                                </div>
                            </div>
                        </div>    
                    </div>
               
            </div>
       )
    }
}