import { Html, Head, Main, NextScript } from "next/document";
import Menu from "../components/menu";
import Footer from "../components/footer";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="css/bootstrap.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
        <link href="css/responsive.css" rel="stylesheet" />
        <link
          rel="shortcut icon"
          href="images/favicon.png"
          type="image/x-icon"
        />
        <link rel="icon" href="images/favicon.png" type="image/x-icon" />
      </Head>
      <body className="hidden-bar-wrapper">
        <div className="page-wrapper">
          <Menu />
          <Main />
          <Footer />
        </div>
        <div className="scroll-to-top scroll-to-target" data-target="html">
          <span className="fa fa-arrow-up"></span>
        </div>
        <NextScript />
        <script src="js/jquery.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>

        <script src="plugins/revolution/js/jquery.themepunch.revolution.min.js"></script>
        <script src="plugins/revolution/js/jquery.themepunch.tools.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.actions.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.migration.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.parallax.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.video.min.js"></script>
        <script src="plugins/revolution/js/main-slider-script.js"></script>
        <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
        <script src="js/jquery.fancybox.js"></script>
        <script src="js/appear.js"></script>
        <script src="js/parallax.min.js"></script>
        <script src="js/tilt.jquery.min.js"></script>
        <script src="js/jquery.paroller.min.js"></script>
        <script src="js/owl.js"></script>
        <script src="js/wow.js"></script>
        <script src="js/mixitup.js"></script>
        <script src="js/swiper-bundle.min.js"></script>
        <script src="js/gsap.min.js"></script>
        <script src="js/ScrollTrigger.min.js"></script>
        <script src="js/trigger-script.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/script.js"></script>
      </body>
    </Html>
  );
}
