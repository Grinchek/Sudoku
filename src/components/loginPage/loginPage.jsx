import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
    const navigate = useNavigate();
    const storedUsers = localStorage.getItem("listUsers");
    const userList = JSON.parse(storedUsers) || [];
    // const renderUsers = () => {
    //     const storedUsers = localStorage.getItem("listUsers");
    //     const userList = JSON.parse(storedUsers) || [];
    //     const list = document.getElementById("userList");
    //     list.innerHTML = userList.map(user => `<div className="container" ><a>${user.userName}<a/><div/>`).join('');
    // }

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
            signedIn: "",
            wins: 0,
            loses: 0
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .max(30, "Username must be 30 characters or less")
                .required("Required"),
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),

        }),

        onSubmit: (values) => {
            const storedUsers = localStorage.getItem("listUsers");
            const userList = JSON.parse(storedUsers) || [];

            if (userList.some(obj => obj.userName === values.userName)) {
                alert("This email is already used");


            }
            else {
                values.loses = 0;
                values.wins = 0;
                values.signedIn = false;
                userList.push(values);
                localStorage.setItem("listUsers", JSON.stringify(userList));


            }
            formik.resetForm();
            //renderUsers();
        }


    });
    //renderUsers();
    return (
        <>
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-container">
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="User Name"
                            onChange={formik.handleChange}
                            value={formik.values.userName} />
                        {formik.errors.userName ? <p>{formik.errors.userName}</p> : null}
                    </div>
                    <div className="input-container">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password} />
                        {formik.errors.password ? <p>{formik.errors.password}</p> : null}
                    </div>
                    <button
                        className='new-game-button'
                        type='submit'>
                        Log In
                    </button>
                    <h4>or</h4>
                    <button className='down-button' onClick={() => navigate('/signin')}>Sign in</button>
                </form>
            </div>

        </>
    );
}

export default LogIn;