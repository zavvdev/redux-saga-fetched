export function Button({ active, simple, className, ...props }) {
  var styles = (() => {
    var base = "px-4 py-2 bg-blue-500 text-white rounded-lg";

    if (active) {
      return base + " bg-blue-700";
    }

    return base;
  })();

  var stylesSimple =
    "px-2 py-1 bg-transparent text-blue-500 border rounded-md hover:underline";

  if (simple) {
    return (
      <button className={`${stylesSimple} ${className}`} {...props} />
    );
  }

  return <button className={`${styles} ${className}`} {...props} />;
}
