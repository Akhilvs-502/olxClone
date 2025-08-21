
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { AuthContext } from '../../store/context';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Header() {
  const {user,setUser}=useContext(AuthContext)
  const auth=getAuth()
  const navigate=useNavigate()


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>{navigate("/")}} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="Search city, area" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction" >
            <Search  color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{ if(!user){ navigate("/login") } }}>{user ? `Hi, ${user.displayName || 'User'}` : 'Login'}</span>
          <br />
          {user && <button onClick={async ()=>{ await signOut(auth); navigate("/login") }}>Logout</button>}
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={()=>{navigate("/create")}} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
