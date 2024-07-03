import Header from "../components/layout/Header";
import LoginRegister from "../components/ecommerce/LoginRegister";

function Login() {
    return (
        <>
            <main className="login_page">
                <Header />
                <section className="">
                    <div className="login_container">
                        <LoginRegister />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;
