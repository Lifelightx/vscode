function Preview({ code }) {
  return (
    <div className="h-full w-full bg-white">
      <iframe
        srcDoc={code}
        title="preview"
        sandbox="allow-scripts" // Be careful with this in production
        width="100%"
        height="100%"
        className="border-none"
      />
    </div>
  );
}

export default Preview;