import { Link } from "react-router-dom";




const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Roxiler System</Link>
      </h1>
      <input type="text" placeholder="search.." />
      <label htmlFor="month">Month: </label>
      <select name="" id="">
        <option value="1">January</option>
      </select>

      <label htmlFor="price">Price</label>
      <select name="" id=""></select>
      
    </header>
  );
};

export default Header;
