import React, { Component } from 'react';
import {Switch,Button} from '@material-ui/core';
import geodist from 'geodist';
import prims from '../dataStructs/Prims';


const locationArray=[
  [26.2502883,78.1735235],
  [ 26.2500766, 78.1695613 ],
  [26.2496472,78.1700595],
  [ 26.246628,78.1731735 ],
  [26.2469349,78.1762078 ],
  [26.2489785,78.1770547],
  [26.2499822,78.1764223]
];
//BH3,MDP,BANK
//[[26.2496472,78.1700595],[26.2489785,78.1770547],[26.2499822,78.1764223]]

class FormComp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checked:[false,false,false,false,false,false,false],
            calculated:false,
            locationArray:null
         }
         this.handleSwitchChange=this.handleSwitchChange.bind(this)
         this.handleCalc=this.handleCalc.bind(this)
    }
    handleCalc(e){
      e.preventDefault()
      let g=[];
      let locArray=[],n=0;
      for(let i=0;i<this.state.checked.length;i++){
        if(this.state.checked[i]==true){
          locArray.push(locationArray[i]);
        }
      }
      n=locArray.length;
      for(let i=0;i<n-1;i++){
        for(let j=i+1;j<n;j++){
          if(i!=j){
            g.push([i,j,geodist({lat:locArray[i][0], lon: locArray[i][1]}, {lat: locArray[j][0], lon: locArray[j][1]},{exact: true, unit: 'km'})]);
          }
        }
      }
      let d=prims(locArray.length, g);
      let orderArray=[]
      d.forEach((ele)=>{
        if(orderArray.indexOf(ele[0])===-1)
        orderArray.push(ele[0]);
        if(orderArray.indexOf(ele[1])===-1)
        orderArray.push(ele[1]);
      })

      let locationOrderArray=[];
      orderArray.forEach((stops)=>{
        locationOrderArray.push(locArray[orderArray.indexOf(stops)]);
      })
      console.log(locationArray)

      this.props.onChangeInPolyline(locationOrderArray)

      this.setState({
        calculated:true,
        locationArray:locationOrderArray
      })



    }
    handleSwitchChange(i){
      let checked=this.state.checked;
      checked[i]=!checked[i]
      this.setState({
        checked:checked,
      })
      this.props.onChangeInMarkers(checked);
    }
    render() { 
        return ( 
            <div style={{marginTop:`25vh`}}>
            <form style={{marginLeft:`7vw`,marginRight:`7vw`,padding:`2vh`,backgroundColor:`#dcdfe3`}}>
           <div style={{marginTop:`2vh`}}>
             
             Hospital ABV-IIITM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Switch
        checked={this.state.checked[0]}
        onChange={()=>{
          this.handleSwitchChange(0)
        }}
       
      /> </div>
      <div style={{marginTop:`2vh`}}>
      Boys Hostel -1 ABV-IIITM &nbsp;&nbsp;
      <Switch
        checked={this.state.checked[1]}
        onChange={()=>{
          this.handleSwitchChange(1)
        }}
       
      />
      </div>
      <div style={{marginTop:`2vh`}}>
      Boys Hostel -3 ABV-IIITM &nbsp;&nbsp;
      <Switch
        checked={this.state.checked[2]}
        onChange={()=>{
          this.handleSwitchChange(2)
        }}
       
      />
      </div>
      <div style={{marginTop:`2vh`}}>
      Sports Complex ABV-IIITM &nbsp;&nbsp;
      <Switch
        checked={this.state.checked[3]}
        onChange={()=>{
          this.handleSwitchChange(3)
        }}
      />
      </div>
      <div style={{marginTop:`2vh`}}>
      Girls Hostel ABV-IIITM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Switch
        checked={this.state.checked[4]}
        onChange={()=>{
          this.handleSwitchChange(4)
        }}
      />
      </div>
      <div style={{marginTop:`2vh`}}>
      MDP ABV-IIITM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Switch
        checked={this.state.checked[5]}
        onChange={()=>{
          this.handleSwitchChange(5)
        }}
      />
      </div>
      <div style={{marginTop:`2vh`}}>
      IMDB Bank ABV-IIITM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Switch
        checked={this.state.checked[6]}
        onChange={()=>{
          this.handleSwitchChange(6)
        }}
      />
      </div>
      <Button style={{backgroundColor:`blue`,color:`white`,marginTop:`5vh`}} onClick={this.handleCalc}>CALCULATE</Button>
            </form>
        {this.state.calculated?
        <div>
          <div style={{marginTop:`4vh`}}>Preferred Route</div>
        <div style={{marginTop:`1vh`}}>
          {this.state.locationArray.map((ele)=>{
            console.log(ele);
            if(ele[0]==26.2502883){
              return "Hospital -> "
            }
            else if(ele[0]==26.2500766){
              return "BH 1 -> "
            }
            else if(ele[0]== 26.246628){
              return "Sports Complex -> "
            }
            else if(ele[0]== 26.2500766){
              return "BH 3 -> "
            }
            else if(ele[0]== 26.2489785){
              return "MDP -> "
            }
            else if(ele[0]== 26.2499822){
              return "Imdb Bank "
            }
            
            else{
              return "GH ->"
            }
          })}
          </div>
          </div>:null}
            
            </div>
         );
    }
}
 
export default FormComp;