import React, { useState, useEffect } from 'react'
import { Repeat } from '@material-ui/icons'
import TableItem from './tableItem'
import data from './images'
import Alert from './Alert'

const TableShow = () => {

    const [dataImages, setDataImages] = useState(data)
    const [noOfMatched, setNoOfMatched] = useState(0)
    const [noOfFail, setNoOfFail] = useState(0)
    const [alert, setAlert] = useState({ show: false })
    const [showManipluate, setShowManipluate] = useState({firstItem: null, secondItem: null})

    // initial shuffle
    React.useEffect(() => {
        setDataImages(dataImages.map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(showManipluate.firstItem && showManipluate.secondItem){
            if (showManipluate.firstItem.id === showManipluate.secondItem.id){
                const data = dataImages.map(item =>{
                    if (item.id === showManipluate.firstItem.id || item.id === showManipluate.secondItem.id ){
                        return { ...item, matched: true }
                    }
                    return item
                })
                setDataImages(data)
                setNoOfMatched(noOfMatched + 1);
                setShowManipluate({
                    firstItem: null,
                    secondItem: null
                })
            } else {
                setTimeout(() => {
                    const data = dataImages.map(item => {
                        if (item.id === showManipluate.firstItem.id || item.id === showManipluate.secondItem.id) {
                            return { ...item, selected: false }
                        }
                        return item
                    })
                    setDataImages(data)
                    setNoOfFail(noOfFail + 1);
                    setShowManipluate({
                        firstItem: null,
                        secondItem: null
                    })
                }, 800);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showManipluate]);

    // Show Alert When User Win
    React.useEffect(() => {
        if(noOfMatched === 8){
            setAlert({ show: true})
        }
    }, [noOfMatched])

    const handleClicked = (index)=>{
        // to prevent the player to select many items when the timer is working
        if(!showManipluate.secondItem){ 
            if (!dataImages[index].matched) {
                if (!showManipluate.firstItem) { // it is empty
                    // select one item only
                    setShowManipluate({
                        ...showManipluate,
                        firstItem: { ...dataImages[index], index }
                    })
                    dataImages[index].selected = true;
                    setTimeout(() => {
                        console.log(dataImages)
                    }, 800);
                } else { // select second one also
                    // to determine it's index not selected before
                    if (showManipluate.firstItem['index'] !== index) {
                        dataImages[index].selected = true;
                        setShowManipluate({
                            ...showManipluate,
                            secondItem: { ...dataImages[index], index }
                        })
                    }
                }
            }
        }
    }

    const hideAlert = () => {
        setAlert({ show: false })
        handleReset()
    }

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
        setNoOfFail(0); setNoOfMatched(0);
        setAlert({ show: false })
        setShowManipluate({ firstItem: null, secondItem: null })
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
                                            handleClick={handleClicked} 
                                        />
                                    )
                                })
                            }
                            {/* <TableItem index={0} {...dataImages[0]} handleClick={handleClicked} />
                            <TableItem index={1} {...dataImages[1]} handleClick={handleClicked} />
                            <TableItem index={2} {...dataImages[2]} handleClick={handleClicked} />
                            <TableItem index={3} {...dataImages[3]} handleClick={handleClicked} /> */}
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem 
                                            key={index+4} 
                                            index={index+4} 
                                            {...dataImages[index+4]} 
                                            handleClick={handleClicked} 
                                        />
                                    )
                                })
                            }
                            {/* <TableItem index={4} {...dataImages[4]} handleClick={handleClicked} />
                            <TableItem index={5} {...dataImages[5]} handleClick={handleClicked} />
                            <TableItem index={6} {...dataImages[6]} handleClick={handleClicked} />
                            <TableItem index={7} {...dataImages[7]} handleClick={handleClicked} /> */}
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem
                                            key={index + 8}
                                            index={index + 8}
                                            {...dataImages[index + 8]}
                                            handleClick={handleClicked}
                                        />
                                    )
                                })
                            }
                            {/* <TableItem index={8} {...dataImages[8]} handleClick={handleClicked} />
                            <TableItem index={9} {...dataImages[9]} handleClick={handleClicked} />
                            <TableItem index={10} {...dataImages[10]} handleClick={handleClicked} />
                            <TableItem index={11} {...dataImages[11]} handleClick={handleClicked} /> */}
                        </tr>

                        <tr>
                            {
                                [...new Array(4)].map((item, index) => {
                                    return (
                                        <TableItem
                                            key={index + 12}
                                            index={index + 12}
                                            {...dataImages[index + 12]}
                                            handleClick={handleClicked}
                                        />
                                    )
                                })
                            }
                            {/* <TableItem index={12} {...dataImages[12]} handleClick={handleClicked} />
                            <TableItem index={13} {...dataImages[13]} handleClick={handleClicked} />
                            <TableItem index={14} {...dataImages[14]} handleClick={handleClicked} />
                            <TableItem index={15} {...dataImages[15]} handleClick={handleClicked} /> */}
                        </tr>
                    </tbody>
                </table>
        
            </div>
        </div>
    )
}

export default TableShow