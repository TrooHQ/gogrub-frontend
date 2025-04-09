const BlinkerSubscribe = () => {
  return (
    <div className="flex items-center">
      <span className="w-3 h-3 bg-red-500 rounded-full animate-blink mr-2"></span>

      <style>
        {`
    @keyframes blink {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
    .animate-blink {
      animation: blink 1s infinite;
    }
  `}
      </style>
    </div>
  );
};

export default BlinkerSubscribe;
