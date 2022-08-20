export default function FormLabel ({ title, name, value, onChange, error, onBlur, placeholder }) {
  return (
    <div className='form-group mb-3'>
        <label>{title}</label>
        <input type="text" name={name} onChange={onChange} value={value} className="form-control" onBlur={onBlur} placeholder={placeholder}/>
        <span className="text-danger">{error}</span>
    </div>
  );
}