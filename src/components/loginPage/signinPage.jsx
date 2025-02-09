import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    let index = 0;
    const navigate = useNavigate();
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
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        }),
        onSubmit: (values) => {
            const storedUsers = localStorage.getItem("listUsers");
            const userList = JSON.parse(storedUsers) || [];
            const usernameIsCorrect = userList.some(obj => obj.userName === values.userName);
            const passwordIsCorrect = userList.some(obj => obj.password === values.password);

            if (usernameIsCorrect && passwordIsCorrect) {
                for (const user in userList) {
                    if (user.userName === values.userName) {
                        index = userList.indexOf(user);
                    }
                }
                values.signedIn = true;
                values.wins = userList[index].wins;
                values.loses = userList[index].loses;
                navigate("/");

            }
            else {
                values.signedIn = false;
                alert("Invalid Username of Password");
            }
            userList.splice(index, 1)
            userList.push(values);
            localStorage.removeItem("listUsers");
            localStorage.setItem("listUsers", JSON.stringify(userList));
            formik.resetForm();


        }
    });
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
                        Sign in
                    </button>
                    <h4>or</h4>
                    <button className='down-button' onClick={() => navigate('/login')}>Log in</button>
                </form>
            </div>
        </>
    );
}

export default SignIn;