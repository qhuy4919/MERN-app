import CSSVariableJSON from './variable.json';

type CssEntry<T = string | number | string[]> = Record<string, T>;
type CssObject = CssEntry | CssEntry<CssEntry>;

const iterate = (cssObject: CssObject, parentNamespace: string = '-') : CssObject => {
    let returnContent = {};
    Object
        .entries(cssObject as CssObject)
        .forEach((entry) => {
            const [key , value] = entry;
            const namespace = value['_namespace'] ? value['_namespace'] : key;
            if(typeof value === 'object') {
                returnContent = {
                    ...returnContent,
                    [key]: iterate(value, `${parentNamespace}-${namespace}`)
                }
            }
            else  {
                if(key !== '_default' && key !== '_namespace') {
                    returnContent[key] = `var(--${parentNamespace}-${key})`
                }
            }
        })
    console.log(returnContent);
    return returnContent;
}

const CSSVariableName = (() => {
    const cssVariableMap = iterate(CSSVariableJSON as any);
})();
