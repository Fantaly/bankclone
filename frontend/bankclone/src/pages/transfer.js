import React from "react";
import { Input } from "reakit/Input";
import { useState } from "react";
import axios from "axios";

export default function Transfer() {
    let [Sender_accountId, setSender_AccountId] = useState("");
    let [sender_balance, setSender_balance] = useState();
    let [receiver_balance, setReceiver_balance] = useState();
    let [success,setSuccess] = useState(false)
    let [error,setError] = useState(false)
    let [Receiver_accountId, setReceiver_AccountId] = useState("");
    let [Amount, setAmount] = useState(null);

    const transaction = {
        sender: Sender_accountId,
        receiver: Receiver_accountId,
        amount: Amount
    }

    function reset_data(){
        setSender_AccountId("")
        setReceiver_AccountId("")
        setSender_balance("");
        setSuccess(false)
        setError(false)
        setAmount("");
    }

    function transfer() {
        axios.post(`http://localhost:8000/api/transfer/`, transaction)
            .then(res => {
                console.log(res.status);
                if(res.status === 200){
                    setSuccess(true);
                    setError(false);
                    setSender_balance(res.data.sender_balance)
                    setReceiver_balance(res.data.receiver_balance)
                }
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.status);
                setError(true);
                setSuccess(false);
            }})
            
    }

    return (
        <div id="home">
            <div className="ricerca-text">
                <h2>Transfer</h2>
                <span onClick={reset_data} className="material-symbols-outlined">
                    close
                </span>
            </div>
            <form className="ricerca-input column" action={transfer}>
                <h1 className="input-label">Sender</h1>
                <Input required placeholder="Inserisci il Sender" id="ricerca-input" className="margin-10" value={Sender_accountId} onChange={e => setSender_AccountId(e.target.value)} />
                <h1 className="input-label">Receiver</h1>
                <Input required placeholder="Inserisci il Receiver" id="ricerca-input" className="margin-10" value={Receiver_accountId} onChange={e => setReceiver_AccountId(e.target.value)} />
                <div className="amount-button">
                    <Input required placeholder="Amount" id="ricerca-input" value={Amount} onChange={e => setAmount(e.target.value)} />
                    <input type="button" id="ricerca-button" value="Cerca" onClick={transfer} />
                </div>
            </form>
            {success && 
                <div className="row"><h1>Success!</h1><h2>New sender balance: {sender_balance}</h2><h2>New receiver balance: {receiver_balance}</h2></div>
            }
            {error && 
                <div className="row"><h1 className="error">Qualcosa è andato storto, perfavore ricontrolla i campi!</h1></div>
            }
        </div>
    )
}

