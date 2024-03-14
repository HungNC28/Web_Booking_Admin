import "./DashboardInfor.css";
import { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export default function DashboardInfor() {
    const [dashboard, setDashboard] = useState({});
    useEffect(() => {
        // fetch transaction data
        const dataFetch = async () => {
            const transactions = await (
                await fetch(`http://localhost:5000/api/admin/dashboard`)
            ).json();

            if (transactions) {
                setDashboard(transactions);
            }
        };
        dataFetch();
    }, []);

    return (
        <div className="container">
            <div className="card_info">
                <h5>User</h5>
                <h1>{dashboard.users}</h1>
                <div className="bottom">
                    <div className="icon_wrapper red">
                        <PersonOutlineIcon />
                    </div>
                </div>
            </div>
            <div className="card_info">
                <h5>Orders</h5>
                <h1>{dashboard.orders}</h1>
                <div className="bottom">
                    <div className="icon_wrapper yellow">
                        <ShoppingCartOutlinedIcon />
                    </div>
                </div>
            </div>
            <div className="card_info">
                <h5>Earnings</h5>
                <h1>$ {dashboard.earnings}</h1>
                <div className="bottom">
                    <div className="icon_wrapper green">
                        <PaidOutlinedIcon />
                    </div>
                </div>
            </div>
            <div className="card_info">
                <h5>Balance</h5>
                <h1>$ {dashboard.balance}</h1>
                <div className="bottom">
                    <div className="icon_wrapper purple">
                        <AccountBalanceWalletOutlinedIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
