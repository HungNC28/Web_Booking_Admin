import "./Navigation.css";
import NavItem from "../NavItem/NavItem";

const menu = [
  {
    title: "main",
    item: [
      {
        link: "/admin/dashboard",
        name: "Dashboard",
        icon: <i className="fa-solid fa-table-cells-large"></i>,
      },
    ],
  },
  {
    title: "lists",
    item: [
      {
        link: "/admin/users",
        name: "User",
        icon: <i className="fa-regular fa-user"></i>,
      },
      {
        link: "/admin/hotels",
        name: "Hotel",
        icon: <i className="fa-solid fa-hotel"></i>,
      },
      {
        link: "/admin/rooms",
        name: "Room",
        icon: <i className="fa-solid fa-person-shelter"></i>,
      },
      {
        link: "/admin/transactions",
        name: "Transactions",
        icon: <i className="fa-solid fa-truck"></i>,
      },
    ],
  },
  {
    title: "new",
    item: [
      {
        link: "/admin/hotels/create",
        name: "New Hotel",
        icon: <i className="fa-solid fa-hotel"></i>,
      },
      {
        link: "/admin/rooms/create",
        name: "New Room",
        icon: <i className="fa-solid fa-person-shelter"></i>,
      },
    ],
  },
  {
    title: "users",
    item: [
      {
        link: "/",
        name: "Logout",
        icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
      },
    ],
  },
];

export default function Navigation(props) {
  return (
    <div className="NavContainer">
      {menu.map((item, index) => (
        <NavItem key={index} data={item} />
      ))}
    </div>
  );
}
