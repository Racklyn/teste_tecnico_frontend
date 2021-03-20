import React, { useEffect, useState } from 'react';
import '../styles/continentes.css'
import {Bar} from 'react-chartjs-2'
import Header from '../components/Header';
import api from '../services/api';

interface countryInterface{
    population:number
}
interface selectedInterface{
    [key: string]: boolean 
}
interface popDataInterface{
    [key: string]: number 
}


function Continentes() {

    const [chartData, setChartData] = useState({})

    const [selected, setSelected] = useState<selectedInterface>({
        africa:true,
        americas:true,
        asia:true,
        europe:true,
        oceania:true,
    })
    const [selectAllChecked, setSelectAllChecked] = useState(true)


    useEffect(()=>{
        chart()
    },[])

    useEffect(()=>{
        //verificando se todos estão selecionados
        setSelectAllChecked(Object.values(selected).every(e=>e))
        chart()
    },[selected])


    function chart(){
        let popData: popDataInterface ={}

        //  Adicionando continentes selecionados
        Object.keys(selected).forEach(key=>{
            if(selected[key]) popData[key]=0
        })
        
        if(Object.keys(popData).length===0){
            updateData({})
        }else{
            //  Somas das populações em cada continente
            Object.keys(popData).forEach(cont=>{
            api.get(`region/${cont}/?fields=name;population`).then(resp=>{
                let totalPop = resp.data.reduce((total:number, country:countryInterface)=>{
                    return total+country.population
                },0)
                popData[cont] = totalPop
                
                updateData(popData)
            })
            })
        }
    }


    function updateData(data:popDataInterface){
        setChartData({
            labels:Object.keys(data),
            datasets:[
                {
                data: Object.values(data),              
                backgroundColor: ['#b00000','#ff0000','#FF5043','#ff6067','#ff9b8e'],
                }
            ]
        })
    }

    function selectAll(value:boolean){
        setSelectAllChecked(value)
        setSelected(
            {
                africa:value,
                americas:value,
                asia:value,
                europe:value,
                oceania:value,
            }
        )
    }

    return (
    <div className="Page-container">
        <Header selected={1}/>
        <main>
            <p className="message">O gráfico circular a seguir apresenta a população dos continentes...</p>
            <div className="main-content">
                <div className="config-menu">
                    <h2>Mostrar:</h2>
                    <div className="options">
                        <div className="select-continent">
                            <input type="checkbox" checked={selectAllChecked} onChange={e=>selectAll(e.target.checked)}/>
                            <label>TODOS</label>
                            {/* <span className="checkmark"></span> */}
                        </div>
                        {Object.keys(selected).map(cont=>{
                            return(
                                <div key={`${cont}-select`} className="select-continent">
                                    <input type="checkbox"
                                        checked={selected[cont]}
                                        onChange={e=>setSelected({...selected,[cont]:e.target.checked})}
                                    />
                                    <label>{cont.toUpperCase()}</label>
                                </div>
                            )
                        })}
                        
                    </div>
                    
                </div>
                <div className="chart-container">
                    <Bar
                        redraw
                        // ref={(reference)=>setChartReference(reference)}
                        data={chartData}
                        height={400}
                        width={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            scales: {
                                yAxes: [
                                    { 
                                        ticks: { beginAtZero: true } 
                                    }
                                ]
                            },
                            legend: {
                                display: false,
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    </div>
    );
}

export default Continentes;
