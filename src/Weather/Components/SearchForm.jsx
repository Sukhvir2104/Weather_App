import React,{useState} from 'react';
import styled from "styled-components";

const InputWrapper = styled.div`
    width:100%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:3rem auto;
`
const InputConatiner= styled.div`
    width:auto;
    border: 1px solid whitesmoke;
`
const Input = styled.input`
  background-color: transparent;
  color: white;
  height:1.5rem;
  border:none;
`
const Buttton = styled.button`
  background-color: #f2a920;
  color: white;
  height: 28px;
  width:7rem;
  border:none;
  @media(max-width:300px){
      width:6rem;
  }
`


function SearchForm(props) {
    const [inputValue,setInputValue]=useState("");
  
    return (
        <InputWrapper>
            <InputConatiner>
                <Input placeholder="City Name"
                 value={inputValue}  
                onChange={(e)=>setInputValue(e.target.value)}/>
                <Buttton type="submit" onClick={()=>props.SubmitHandler(inputValue)}>Search</Buttton>
            </InputConatiner>
        </InputWrapper>
    );
}

export default SearchForm;