export function useFlasher() {
    const ref = React.useRef(null);
    React.useEffect(() => {
        ref.current.animate(
            [
                { boxShadow: "0 0 8px 1px rgba(255,0,0,.6)" },
                { boxShadow: "none" },
            ],
            { duration: 500 }
        );
    });
    return ref;
}
