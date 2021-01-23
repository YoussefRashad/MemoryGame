import React from 'react'

const tableItem = ({ index, path, initialState, selected, handleClick }) => {
    return (
        <td
            className={`shadowItemWithoutBox p-md-3 hover`}
            onClick={() => handleClick(index)}
        >
            <div className="itemStyling">
                <img
                    src={!selected ? initialState : path}
                    alt="guess it"
                />
            </div>
        </td>
    )
}

export default tableItem
