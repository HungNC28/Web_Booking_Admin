import "./EditRoom.css";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditRoom() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState();
    const [hotels, setHotels] = useState([]);
    // const [title, setTitle] = useState("");
    // const [desc, setDesc] = useState("");
    // const [price, setPrice] = useState(0);
    // const [maxPeople, setMaxPeople] = useState(0);
    // const [roomNumbers, setRoomNumbers] = useState([]);
    // const [nameHotel, setNameHotel] = useState("");

    // Tìm room theo Id
    const url = `http://localhost:5000/api/rooms/${roomId}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                if (jsonData) setRoom({ ...jsonData });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const submitHandle = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/admin/rooms/update/${roomId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(room),
        })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/admin/rooms");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <div className="title">
                <h1>Update Room</h1>
            </div>
            {room && (
                <Form onSubmit={submitHandle}>
                    <div className="form">
                        <div className="form_info">
                            <div className="form_controller">
                                <label>Title</label>
                                <input
                                    defaultValue={room.title}
                                    type="text"
                                    name="title"
                                    onChange={(e) => {
                                        setRoom({
                                            ...room,
                                            title: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Description</label>
                                <input
                                    defaultValue={room.desc}
                                    type="text"
                                    name="description"
                                    onChange={(e) => {
                                        setRoom({
                                            ...room,
                                            desc: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Price</label>
                                <input
                                    defaultValue={room.price}
                                    type="number"
                                    name="price"
                                    onChange={(e) => {
                                        setRoom({
                                            ...room,
                                            price: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Max people</label>
                                <input
                                    defaultValue={room.maxPeople}
                                    type="number"
                                    name="maxPeople"
                                    onChange={(e) => {
                                        setRoom({
                                            ...room,
                                            maxPeople: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form_button">
                            <div className="form_controller">
                                <label>Rooms</label>
                                <input
                                    defaultValue={room.roomNumbers}
                                    type="text"
                                    name="rooms"
                                    onChange={(e) => {
                                        setRoom({
                                            ...room,
                                            roomNumbers:
                                                e.target.value.split(", "),
                                        });
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Chosse a hotel</label>
                                <select name="nameHotel">
                                    {hotels.map((h) => (
                                        <option key={h._id}>{h.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </Form>
            )}
        </div>
    );
}
