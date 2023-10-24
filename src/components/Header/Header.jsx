import logo from "../../assets/PushHire.svg";
import icon from "../../assets/Icon.svg";
const Header = () => {
  return (
    <header className="w-full flex flex-col py-2 h-auto  border-primary-200 border-b  ">
      <div className="flex h-14 max-w-7xl gap-2  px-8 py-0 items-center mx-20 self-stretch">
        <span className="h-5 mb-1.5 mr-1 self-center">
          <img src={icon} />
        </span>
        <span className="font-bold text-primary-600 h-5 w-28">
          <img src={logo} />
        </span>
      </div>
    </header>
  );
};

export default Header;
