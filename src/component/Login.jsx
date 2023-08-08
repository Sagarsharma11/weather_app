import React,{useState} from 'react'

const Login = ({checkLogin}) => {
    const [user, setUser] = useState({
        userName:'',
        password:''
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(user.userName==="demo" && user.password ==="password"){
            sessionStorage.setItem("isLogin",true)
            checkLogin()
        }
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center full-screen-height">
                <div className="col-md-4 border shadow p-5 ">
                    <form onSubmit={handleSubmit} >
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">User Name</label>
                            <input onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} name="userName" type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} name="password" type="password" class="form-control" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login