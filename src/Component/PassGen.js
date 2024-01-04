import {useState} from 'react'
import React from 'react';
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

function PassGen(){

    const notify = (text) => {
        toast.error(text, {
            position: toast.POSITION.TOP_CENTER
          });
        }

        const success= (text)=>{
            toast.success(text, {
                position: toast.POSITION.TOP_CENTER
              });
        }
    

    let UPPERCASE ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let LOWERCASE ="abcdefghijklmnopqrstuvwxyz"
    let NUMBS = "0123456789"
    let SYMBS = "?)*&^%$#@!~<>{}(]["



    let[number,setNumber] = useState(8);
    function getNum(e){
        let storeValue= e.target.value;
        setNumber(storeValue)
    }
        // console.log(number); 

    let[upperTxt,setUpperTxt]= useState(false);   
        function upperText(e){
           setUpperTxt(e.target.checked)
        }

        let[lowerTxt,setLowerTxt]= useState(false);
        function lowerText(e){
            setLowerTxt(e.target.checked)
        }

        let[numberTxt,setNumberTxt] = useState(false);
        function numberText(e){
            setNumberTxt(e.target.checked)
        }

        let[symbolTxt,setSymbolTxt]= useState(false);
        function symbolText(e){
            setSymbolTxt(e.target.checked)
        }
       // console.log(upperTxt,lowerTxt,numberTxt,symbolTxt);
            
        let[password,setPassword] = useState("")
       function clickBtn(){
        let takeValue= "";

        if(upperTxt===false && lowerTxt===false && symbolTxt===false && numberTxt===false){
            notify("Please Select one of the Checkbox")
            setPassword("");
        }else{
            if(upperTxt){
                takeValue+=UPPERCASE;
            }
            if(lowerTxt){
                takeValue+=LOWERCASE;
            }
            if(numberTxt){
                takeValue+=NUMBS;
            }
            if(symbolTxt){
                takeValue+=SYMBS;
            }
            displayPass(takeValue);
        }
       }

       function displayPass(takeValue){
        let update="";
        if(number>8 && number<50){
            for(let i=0;i<number;i++){
                let randomIndex = Math.floor(Math.random()*takeValue.length);
                update+= takeValue.charAt(randomIndex);
            }
            setPassword(update);
        }else{
            notify("Please the Number between 8 to 50")
        }
       }

       function copyTxt(){
        let set= password;
        // console.log(set);
        if(set==""){
            notify("There is an Empty Input");
        }else{
            navigator.clipboard.writeText(set);
            success("Successfully Copied😎")
        }
       }

    return(
        <div className="container">
              <ToastContainer />
           <h1 className="center">Password Generator</h1>
           <div className="firstInp">
            <input type="text" value={password} className="forWidth" disabled/>  
            <i onClick={copyTxt} className="ri-file-copy-2-fill icon"></i>
           </div>

           <div className="main">
               <h3>Select Password length(**8-50 characters**)</h3> 
               <input type="number" value={number} min={8} max={50} onChange={getNum} />
           </div>

            <div className="allCheckBox">
                <input type="checkbox" onChange={upperText}  className="side" />Include upper case
                <br />
                <input type="checkbox" onChange={lowerText} />Include lower case
                <br />
                <input type="checkbox" onChange={numberText} />Include numbers
                <br />
                <input type="checkbox" onChange={symbolText} />Include symbols
            </div>

      {/* ///////Genterate Password Button /////// */}
            <div className="button_cont" align="center"><a className="example_e"  rel="nofollow noopener" onClick={clickBtn}>Genrate Password</a>
            </div>

        </div>
    )
}
export default PassGen