const CheckBox = ({ title, state, onChange }) => {
    return (
        <div className="space-x-2 text-lg">
              <input
                type="checkbox"
                onChange={onChange}
                checked={state}
              />
              <label>{title}</label>
            </div>
    )
};

export default CheckBox
