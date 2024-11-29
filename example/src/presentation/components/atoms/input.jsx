export function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`p-2 border border-gray-300 rounded-md ${className}`}
    />
  );
}
