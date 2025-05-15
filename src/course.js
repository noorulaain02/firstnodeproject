import React from 'react';
import { variables } from './variables';

export class Course extends React.Component
{
    constructor(props){
        // constructor overloading with the super method 
        // it will be automatically set to the student table
        super(props);
        this.state = {
            courses:[],
            CourseId:0,
            ModalTitle:"",
            CourseCode:"",
            CourseName:""
        }
    }


    refreshList(){
        fetch(variables.API_URL + 'Course')
        // .then methods are promises after the fetch url
        .then(response=>response.json())
        .then(data=>{this.setState({courses:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    //add properties

    changeCourseCode= (e)=>{
        this.setState({CourseCode:e.target.value});
    }

    changeCourseName= (e)=>{
        this.setState({CourseName:e.target.value});
    }

    addClick(){
        this.setState ({
            modalTitle:'Add Course',
            CourseId:0,
            CourseCode:"",
            CourseName:""
        });
    }
    editClick(c)
    {
        this.setState({
            modalTitle:'Edit Course',
            CourseId:c.CourseId,
            CourseCode: c.CourseCode,
            CourseName: c.CourseName
        });
    }
    createClick()
    {
        fetch(variables.API_URL+'Course',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CourseId: 0,
                CourseCode: this.state.CourseCode,
                CourseName: this.state.CourseName,
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
            fetch(variables.API_URL+'Course',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    CourseId: this.state.CourseId,
                    CourseCode: this.state.CourseCode,
                    CourseName: this.state.CourseName,
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
            deleteClick(c){
                if(window.confirm('Are you Sure to Delete?')) {
                    fetch(variables.API_URL+'Course',
                    {method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        CourseId: this.state.CourseId,
                        CourseCode: "string",
                        CourseName: "string",
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
            }
        

    render()
    {
        const {
            courses,
            modalTitle,
            CourseId,
            CourseCode,
            CourseName
        } = this.state;

        // jo cheez render kay ander hogi woh browser main chalna hojaey gi
        return(
            <div>
                <button type='button' className='btn btn-primary m-2 float-end' data-bs-toggle='modal' data-bs-target="#exampleModal" 
                onClick={() => this.addClick()} > Add Course
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th> Course Id </th>
                        <th> Course Code </th>
                        <th> Course Name</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(c =>
                                <tr key={c.CourseId}>
                                    <td>{c.CourseId}</td>
                                    <td>{c.CourseCode}</td>
                                    <td>{c.CourseName}</td>
                                    
                                    <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(c)}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor"className="bibi-pencil-square"viewBox="0 0 16 16">  
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    </button>
                                    <button type="button"className="btn btn-light mr-1"onClick={()=>this.deleteClick(c)}>
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
                                        <span className="input-group-text"> Course Code</span>
                                        <input type="text" className="form-control" value={CourseCode} onChange={this.changeCourseCode}/>    
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"> Course Name</span>
                                        <input type="text" className="form-control" value={CourseName} onChange={this.changeCourseName}/>    
                                    </div>

                                    {
                                    CourseId ===0?
                                    <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={()=>this.createClick()}
                                    >Create</button>
                                    :null
                                    }
                                    {
                                    CourseId!==0?
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