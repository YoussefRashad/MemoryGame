import React from 'react'

const tableItem = ({ index, path, initialState, selected, handleClick, isLoading }) => {
    return (
        <td
            className={`p-md-3 item ${!isLoading && 'shadowItemWithoutBox' }`}
            style={!isLoading ? {cursor: 'pointer'}: {}}
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
