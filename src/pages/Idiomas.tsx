import React, { useEffect, useState } from 'react';
import '../styles/idiomas.css'
import {defaults, Doughnut} from 'react-chartjs-2'
import Header from '../components/Header';
import api from '../services/api';

defaults.global.legend.position = 'right'

interface countryInterface{
    population:number,
    languages:{name:string}[]
}
interface selectedInterface{
    [key: string]: boolean 
}
interface languagesInterface{
    [key: string]: number 
}


function Idiomas() {

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
        let languages: languagesInterface ={}

        Object.keys(selected).forEach(cont=>{
            if(selected[cont]){
                api.get(`region/${cont}`).then(resp=>{
                    resp.data.forEach((country:countryInterface)=>{
                        country.languages.forEach(lang=>{
                            if(languages.hasOwnProperty(lang.name)){
                                languages[lang.name]+=1
                            }else{
                                languages[lang.name]=1
                            }
                        })
                    })
                    // console.log(Object.values(languages).sort((a,b)=>a-b))
                    updateData(languages)
            
                })
            }
        })
    }

    function updateData(data:languagesInterface){
        setChartData({
            labels:Object.keys(data).slice(0,10),
            datasets:[
                {
                data: Object.values(data).slice(0,10),
                
                backgroundColor: [
                    '#830000',
                    '#b00000',
                    '#ff0000',
                    '#ff301c',
                    '#FF5043',
                    '#ff6067',
                    '#ff9b8e',
                    '#ff9eae',
                    '#ffcebe',
                    '#ff9dee',
                ],

                }
            ]
            }
        )
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
        <Header selected={3}/>
        <main>
            <p className="message">
                O gráfico circular a seguir apresenta a quantidade de países que falam determinado
                idioma nos continentes que estão sendo considerados.
                <br/>O gráfico apresenta apenas os 8 idiomas mais falados nos continentes considerados.
                </p>
            <div className="main-content">
                <div className="config-menu">
                    <h2>Considerando os continentes:</h2>
                    <div className="options">
                        <div className="select-continent">
                            <input type="checkbox" checked={selectAllChecked} onChange={e=>selectAll(e.target.checked)}/>
                            <label>Todos</label>
                            {/* <span className="checkmark"></span> */}
                        </div>
                        {Object.keys(selected).map(cont=>{
                            return(
                                <div key={`${cont}-select`} className="select-continent">
                                    <input type="checkbox"
                                        checked={selected[cont]}
                                        onChange={e=>setSelected({...selected,[cont]:e.target.checked})}
                                    />
                                    <label>{cont}</label>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
                <div className="chart-container">
                    <Doughnut
                        data={chartData}
                        height={400}
                        width={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            legend: {
                                display: true,
                                labels: {
                                    // fontColor: '#012130',
                                    fontSize: 20,
                                    boxWidth: 40,
                                    padding: 10,
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    </div>
    );
}

export default Idiomas;
