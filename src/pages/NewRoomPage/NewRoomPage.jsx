import "./NewRoomPage.css";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewRoomPage() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [maxPeople, setMaxPeople] = useState(0);
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [nameHotel, setNameHotel] = useState("");

    const dataFetch = async () => {
        const data = await (
            await fetch(`http://localhost:5000/api/admin/hotels`)
        ).json();

        if (data) {
            setHotels(data);
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);

    const submitHandle = (e) => {
        e.preventDefault();

        // validate thông tin
        if (title === "") {
            alert("Title không được để trống");
        } else if (desc === "") {
            alert("Title không được để trống");
        } else if (roomNumbers.length === 0) {
            alert("Rooms không được để trống");
        } else {
            const formData = {
                desc,
                maxPeople,
                price,
                roomNumbers: roomNumbers.split(","),
                title,
            };

            fetch("http://localhost:5000/api/admin/rooms/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (res.status === 201) {
                        navigate("/admin/rooms");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div>
            <div className="title">
                <h1>Add New Room</h1>
            </div>
            <Form onSubmit={submitHandle}>
                <div className="form">
                    <div className="form_info">
                        <div className="form_controller">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form_controller">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                onChange={(e) => {
                                    setDesc(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form_controller">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form_controller">
                            <label>Max people</label>
                            <input
                                type="number"
                                name="maxPeople"
                                onChange={(e) => {
                                    setMaxPeople(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form_button">
                        <div className="form_controller">
                            <label>Rooms</label>
                            <input
                                type="text"
                                name="rooms"
                                onChange={(e) => {
                                    setRoomNumbers(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form_controller">
                            <label>Chosse a hotel</label>
                            <select
                                name="nameHotel"
                                onChange={(e) => {
                                    setNameHotel(e.target.value);
                                }}
                            >
                                {hotels.map((h) => (
                                    <option key={h._id}>{h.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Send</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
