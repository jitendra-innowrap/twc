import Header from "../components/layout/Header";
import LoginRegister from "../components/ecommerce/LoginRegister";
import Layout from "../components/layout/Layout";

function Login() {
    return (
        <>
        <Layout noBreadcrumb="d-none" noFooter headerStyle="header-style-1">
            <main className="login_page">
                <section className="">
                    <div className="login_container">
                        <LoginRegister />
                    </div>
                </section>
            </main>
        </Layout>
        </>
    );
}

export default Login;
