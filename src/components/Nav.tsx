import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Potential Candidates", path: "/SavedCandidates" },
  ];
  return (
    <div>
      <ul className="nav">
        {navItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={
                currentPage === item.path ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
