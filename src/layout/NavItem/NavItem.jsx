import "./NavItem.css";
import { NavLink } from "react-router-dom";

export default function NavItem(props) {
  const { data } = props;
  return (
    <div className="NavItemcontainer">
      <h4 className="NavItemTitle">{data.title}</h4>
      <ul className="NavItemUl">
        {data.item.map((subItem, index) => (
          <li className="NavItemLi" key={index}>
            <NavLink
              end
              to={subItem.link}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {subItem.icon}
              {subItem.name === "Logout" ? (
                <button className="NavItembtn">{subItem.name}</button>
              ) : (
                <span>{subItem.name}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
