export default function FormLabel ({ title, name, value, onChange, error, errormessage, onBlur }) {
  return (
    <div className='form-group mb-3'>
        <label>{title}</label>
        <input type="text" name={name} onChange={onChange} value={value} className="form-control"  errormessage={errormessage} onBlur={onBlur}/>
        <span className="text-danger">{error}</span>
    </div>
  );
}