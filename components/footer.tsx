import { Footer } from "../styles/Home.styles";
const FooterComponent = () => (
  <Footer>
    <a
      href="https://loquenecesito.co"
      target="_blank"
      rel="noopener noreferrer"
    >
      Created for{" "}
      <span className="logo">
        <img
          src="https://loquenecesito.co/assets/images/logolqn.4d46720645d4c88104a73e0dca6f421d.png"
          alt="LQN logo"
          height={16}
        />
      </span>
    </a>
  </Footer>
);

export default FooterComponent