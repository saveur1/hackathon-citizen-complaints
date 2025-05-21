import { AuthContext } from "Context/user-context";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileDropdown from "../dropdowns/user-profile-dropdown";
import { ChevronDown } from "lucide-react";

function Navigation() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    if (!authContext) return null;
    const { user, logout, isLog, setError } = authContext;

    useEffect(() => {
        setError("");

        if (!isLog)
            navigate("/login");
        
    }, [navigate]);
    
    return (
        <nav className="flex justify-between items-center bg-red-600 text-white px-10 sticky top-0 z-50 shadow-md rounded-md">
            <Link to="/" className="text-white text-xl font-bold">
                <img src="/web_logo.png" height={ 30 } width={ 300 } alt="Logo" className="h-20 w-52"/>
            </Link>

            <div className="flex items-center gap-3 group relative">
                <div className="relative cursor-pointer h-20 flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex justify-center items-center border-2 border-white/50">
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} alt={user.fullName} className="w-full h-full object-cover" />
                        ) : 
                        (<span className="text-lg font-bold text-white">{user?.fullName?.charAt(0).toUpperCase() || "U"}</span>)}
                    </div>
                </div>
                <div className="flex flex-col h-20 justify-center">
                    <p className="font-bold">{user?.fullName}</p>
                    <p className="text-sm text-gray-200 pb-2 capitalize">{user?.role}</p>
                </div>
                <div className="flex flex-col h-20 justify-center">
                    <ChevronDown size={18} className="text-white group-hover:-rotate-180 transition-all duration-500"/>
                </div>

                <UserProfileDropdown user={user } logout = { logout }/>
            </div>
        </nav>
    );
}

export default Navigation;