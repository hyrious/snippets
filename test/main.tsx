const { useContext, useState } = React;
import { useFlasher } from "../src/useFlasher";

type Value<S> = { value: S; setValue: (s: S) => void };

const globalContext = React.createContext<{
    count: Value<number>;
    name: Value<string>;
}>({
    count: { value: 0, setValue(_v: number) {} },
    name: { value: "", setValue(_v: string) {} },
});

const { Provider } = globalContext;

function useValue<S>(init: S | (() => S)): Value<S> {
    const [value, setValue] = useState<S>(init);
    return { value, setValue };
}

function App() {
    const count = useValue(0);
    const name = useValue("");
    return (
        <Provider value={{ count, name }}>
            <div style={{ maxWidth: 400 }}>
                <Count />
                <Name />
                <PureCount count={count} />
                <PureName name={name} />
            </div>
        </Provider>
    );
}

function Card({ children }: React.PropsWithChildren<{}>) {
    return (
        <div
            ref={useFlasher()}
            style={{
                padding: 20,
                marginBottom: 8,
                border: "1px solid",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    );
}

function Flex1({ children }) {
    return <span style={{ flex: 1 }}>{children}</span>;
}

function Count() {
    const { count } = useContext(globalContext);
    return (
        <Card>
            <Flex1>Count: {count.value}</Flex1>
            <button onClick={() => count.setValue(count.value + 1)}>++</button>
        </Card>
    );
}

function Name() {
    const { name } = useContext(globalContext);
    return (
        <Card>
            <Flex1>Name: {name.value}</Flex1>
            <input
                value={name.value}
                onChange={(e) => name.setValue(e.target.value)}
            />
        </Card>
    );
}

const PureCount = React.memo(
    ({ count }: { count: Value<number> }) => {
        return (
            <Card>
                <Flex1>Count: {count.value}</Flex1>
                <button onClick={() => count.setValue(count.value + 1)}>
                    ++
                </button>
            </Card>
        );
    },
    ({ count: a }, { count: b }) => {
        return a.value === b.value;
    }
);

const PureName = React.memo(
    ({ name }: { name: Value<string> }) => {
        return (
            <Card>
                <Flex1>Name: {name.value}</Flex1>
                <input
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                />
            </Card>
        );
    },
    ({ name: a }, { name: b }) => {
        return a.value === b.value;
    }
);

ReactDOM.render(<App />, document.getElementById("root"));
