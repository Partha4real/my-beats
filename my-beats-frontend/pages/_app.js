import Router from "next/router";
import store from "../store/store";
import { connect, Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);
const mapStateToProps = (state) => ({
    loading: state.loading,
});

export default wrapper.withRedux(connect(mapStateToProps, null)(MyApp));
