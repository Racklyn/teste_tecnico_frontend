import React, { useEffect, useState } from 'react';
import '../styles/continentes.css'
import {Doughnut, defaults} from 'react-chartjs-2'
import Header from '../components/Header';

defaults.global.legend.display = true
defaults.global.legend.position = 'bottom'

function Continentes() {

    const [selected, setSelected] = useState({
        africa:true,
        americas:true,
        asia:true,
        europa:true,
        oceania:true,
    })
    const [selectAllChecked, setSelectAllChecked] = useState(true)



    useEffect(()=>{
        //verificando se todos estão selecionados
        setSelectAllChecked(Object.values(selected).every(e=>e))
    },[selected])


    function selectAll(value:boolean){
        setSelectAllChecked(value)
        setSelected(
            {
                africa:value,
                americas:value,
                asia:value,
                europa:value,
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
                            <label>Todos</label>
                            {/* <span className="checkmark"></span> */}
                        </div>
                        <div className="select-continent">
                            <input type="checkbox"
                                checked={selected.africa}
                                onChange={e=>setSelected({...selected,africa:e.target.checked})}
                            />
                            <label>África</label>
                        </div>
                        <div className="select-continent">
                            <input type="checkbox"
                                checked={selected.americas}
                                onChange={e=>setSelected({...selected,americas:e.target.checked})}
                            />
                            <label>Américas</label>
                        </div>
                        <div className="select-continent">
                            <input type="checkbox"
                                checked={selected.asia}
                                onChange={e=>setSelected({...selected,asia:e.target.checked})}
                            />
                            <label>Ásia</label>
                        </div>
                        <div className="select-continent">
                            <input type="checkbox"
                                checked={selected.europa}
                                onChange={e=>setSelected({...selected,europa:e.target.checked})}
                            />
                            <label>Europa</label>
                        </div>
                        <div className="select-continent">
                            <input type="checkbox"
                                checked={selected.oceania}
                                onChange={e=>setSelected({...selected,oceania:e.target.checked})}
                            />
                            <label>Oceania</label>
                        </div>
                    </div>
                    
                </div>
                <div className="chart-container">
                    <Doughnut
                        data={{
                        labels:["África","Américas","Ásia","Europa","Oceania"],
                        datasets:[
                            {
                            
                            data: [6,2,5,4,3],
                            
                            backgroundColor: [
                              '#a70000',
                              '#ff0000',
                              '#ff5252',
                              '#ff7b7b',
                              '#ffbaba',
                            ],

                            }
                        ]
                        }}
                        height={400}
                        width={400}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            
                        }}
                    />
                </div>
            </div>
        </main>
    </div>
    );
}

export default Continentes;
