import React, { useState } from 'react'
import { Repeat } from '@material-ui/icons'
import TableItem from './tableItem'
import data from './images'
import Alert from './Alert'

const TableShow = () => {

    const [dataImages, setDataImages] = useState(data)
    const [noOfSelected, setNoOfSelected] = useState(0)
    const [noOfMatched, setNoOfMatched] = useState(0)
    const [noOfFail, setNoOfFail] = useState(0)
    const [alert, setAlert] = useState({ show: false })
    const hideAlert = () =>{
        setAlert({ show: false })
        handleReset()
    }

    // initial shuffle
    React.useEffect(()=>{
        setDataImages(dataImages.map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Show Alert When User Win
    React.useEffect(() => {
        if(noOfMatched === 8){
            setAlert({ show: true})
        }
    }, [noOfMatched])

    const handleClick = (ID) => {
      if (!dataImages[ID].matched) {
        setNoOfSelected(noOfSelected + 1);

        if (noOfSelected < 2) {
          // if matched 2
          if (noOfSelected === 1) {
            dataImages[ID].selected = true;
            let isfail = true;
            let fromCondition = false;

            for (let index = 0; index < dataImages.length; index++) {
              if (index === ID) continue;
              else if (
                dataImages[index].selected &&
                dataImages[index].id === dataImages[ID].id
              ) {
                dataImages[index].matched = true;
                dataImages[ID].matched = true;
                setNoOfMatched(noOfMatched + 1);
                fromCondition = true;
                break;
              } else {
                isfail = true;
              }
            }

            if (isfail && !fromCondition) {
              setNoOfFail(noOfFail + 1);
            }

            setTimeout(() => {
              // to set all selected items by false to hide it
              for (let index = 0; index < dataImages.length; index++) {
                if (dataImages[index].selected) {
                  if (!dataImages[index].matched) {
                    dataImages[index].selected = false;
                    if (!dataImages[ID].matched) {
                      dataImages[ID].selected = false;
                    }
                  }
                }
              }

              setNoOfSelected(0);
            }, 500);
          } else {
            // 1
            dataImages[ID].selected = true;
          }
        }
      }
    };

    const handleReset = ()=>{
        let data = dataImages.map(item =>{
            item.selected = false;
            item.matched = false;
            return item
        }).map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value)
        setDataImages(data)
        // reset all state
        setNoOfFail(0); setNoOfMatched(0); setNoOfSelected(0);
    }

    return (
        <div className="container">
            { alert.show && <Alert hideAlert={hideAlert} /> }

            <div className="row my-4">
                <p className="col-5 textStyle text-center">Number of wins: {noOfMatched}</p>
                <p className="col-5 textStyle text-center">Number of fails: {noOfFail}</p>
                <div className="col-2 text-right">
                    <span className="btn btn-primary" onClick={handleReset}>
                        <Repeat />
                    </span>
                </div>
            </div>

            <div className="row">

                <table className="table table-striped table-bordered border-primary">
                    <tbody>
                        <tr>
                            {
                                [...new Array(4)].map((item, index)=>{
                                    return (
                                        <TableItem 
                                            key={index}
                                            index={index} 
                                            {...dataImages[index]} 
                                            handleClick={handleClick} 
                                        />
                                    )
                                })
                            }
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem 
                                            key={index+4} 
                                            index={index+4} 
                                            {...dataImages[index+4]} 
                                            handleClick={handleClick} 
                                        />
                                    )
                                })
                            }
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem
                                            key={index + 8}
                                            index={index + 8}
                                            {...dataImages[index + 8]}
                                            handleClick={handleClick}
                                        />
                                    )
                                })
                            }
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem
                                            key={index + 12}
                                            index={index + 12}
                                            {...dataImages[index + 12]}
                                            handleClick={handleClick}
                                        />
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </table>
        
            </div>
        </div>
    )
}

export default TableShow