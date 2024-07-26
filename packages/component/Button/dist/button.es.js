import { reactive as y, computed as n, openBlock as d, createElementBlock as b, normalizeClass as g, normalizeStyle as f, toDisplayString as x } from "vue";
const C = (e, s) => {
  const o = e.__vccOpts || e;
  for (const [l, t] of s)
    o[l] = t;
  return o;
}, k = {
  __name: "Button",
  props: {
    label: {
      type: String,
      required: !0
    },
    primary: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      validator: function(e) {
        return ["small", "medium", "large"].indexOf(e) !== -1;
      }
    },
    backgroundColor: {
      type: String
    }
  },
  emits: ["click"],
  setup(e, { emit: s }) {
    const o = e, l = s, t = y(o), c = n(() => {
      let r = "font-bold rounded text-white", a = "bg-blue-500 hover:bg-blue-700", p = "bg-gray-500 hover:bg-gray-700", m = {
        small: "py-1 px-2 text-sm",
        medium: "py-2 px-4 text-base",
        large: "py-3 px-6 text-lg"
      };
      return `${r} ${t.primary ? a : p} ${m[t.size || "medium"]}`;
    }), i = n(() => ({
      backgroundColor: t.backgroundColor
    })), u = () => {
      l("click");
    };
    return (r, a) => (d(), b("button", {
      class: g(c.value),
      type: "button",
      onClick: u,
      style: f(i.value)
    }, x(e.label), 7));
  }
}, v = /* @__PURE__ */ C(k, [["__scopeId", "data-v-fc400715"]]);
export {
  v as default
};
