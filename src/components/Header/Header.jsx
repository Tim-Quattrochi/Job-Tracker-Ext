import logo from "../../assets/PushHire.svg";
import icon from "../../assets/Icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { clearUser } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { Slide, toast } from "react-toastify";

const Header = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  if (pathname === "/") return "";

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
      {user && (
        <button
          onClick={() => {
            logout()
              .unwrap()
              .then((res) => {
                if (res.message == "Logged out.") {
                  dispatch(clearUser(user));

                  navigate("/login");
                }
              })
              .catch((err) => {
                console.log(err);
                if (err.status === 403 || err.status === 401) {
                  return toast.error(
                    "Token expired. Redirecting to login.",
                    {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 3000, //3 seconds
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,

                      transition: Slide,
                    },

                    setTimeout(() => {
                      navigate("/login");
                    }, 2000)
                  );
                }
              });
          }}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
