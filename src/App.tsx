import { createTheme, ThemeProvider } from "flowbite-react";
import { Route, Routes } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import VerificationPage from "./pages/VerificationPage";
import Forgot from "./pages/Forgot";

export default function App() {
  const { token } = useAuth();

  if (token) {
    return (
      <ThemeProvider theme={customTheme} root={true}>
        <PrivateRoutes />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={customTheme} root={true}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}
//w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none

const customTheme = createTheme({
  modal: {
    root: {
      base: "z-50",
      show: {
        on: "flex bg-gray-900/50 dark:bg-gray-900/80",
        off: "hidden",
      },
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-white",
    },
    body: {
      base: "flex-1 overflow-auto p-6",
      popup: "pt-0",
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
      popup: "border-b-0 p-2",
      title: "mr-2 w-full text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
    footer: {
      base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
      popup: "border-t",
    },
  },
  pagination: {
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-300 dark:bg-white dark:text-gray-400 enabled:dark:hover:bg-gray-300 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-300 dark:bg-white dark:text-gray-400 enabled:dark:hover:bg-gray-300 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-300 dark:bg-white dark:text-gray-400 enabled:dark:hover:bg-gray-300 enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
  },
  button: {
    color: {
      primary:
        "w-full cursor-pointer rounded-lg bg-[#72CAEE] py-2 font-semibold text-white transition-colors hover:bg-[#0D92F4]",
      secondary:
        "w-full cursor-pointer rounded-lg bg-[#F95454] py-2 font-semibold text-white transition-colors hover:bg-[#C62E2E]",
      success:
        "w-full cursor-pointer rounded-lg bg-[#34D399] py-2 font-semibold text-white transition-colors hover:bg-[#10B981]",
      cancel:
        "w-full cursor-pointer rounded-lg border border-gray-200 bg-white py-2 font-semibold text-gray-800 transition-colors hover:border-gray-300 hover:bg-gray-100",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
  hr: {
    root: {
      base: "my-8 h-px border-0 bg-gray-100 dark:bg-gray-200",
    },
  },
  tabs: {
    tablist: {
      variant: {
        underline:
          "-mb-px flex-wrap border-b border-gray-100 dark:border-gray-200",
      },
      tabitem: {
        base: "rounded-t-lg",
        variant: {
          underline: {
            active: {
              on: "rounded-t-lg border-b-2 border-sky-600 text-sky-600 dark:border-sky-500 dark:text-sky-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
      },
    },
  },
  popover: {
    base: "absolute z-20 inline-block w-max max-w-[100vw] rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-white shadow-sm outline-none dark:border-gray-600 dark:bg-gray-800",
    inner: "relative",
    content: "z-10 overflow-hidden rounded-[7px]",
    arrow: {
      base: "absolute z-0 h-2 w-2 rotate-45 border border-gray-200 bg-white mix-blend-lighten dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
      placement: "-4px",
    },
  },
  table: {
    root: {
      base: "w-full overflow-x-auto border-gray-200 dark:border-gray-600",
    },
    head: {
      base: "group/head text-xs text-gray-700 uppercase dark:text-gray-800",
      cell: {
        base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-200",
      },
    },
    body: {
      base: "divide-y divide-gray-100 dark:divide-gray-200 dark:bg-gray-800",
      row: {
        base: "hover:bg-gray-100 dark:hover:bg-gray-200",
        cell: {
          base: "px-6 py-4",
        },
      },
    },
  },

  textInput: {
    base: "!bg-transparent dark:bg-white",
    addon:
      "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600",
    field: {
      base: "!bg-transparent",
      icon: {
        base: "",
        svg: "",
      },
      rightIcon: {
        base: "",
        svg: "",
      },
      input: {
        base: "!focus:ring-[#72CAEE] w-full rounded-lg border border-gray-400 !bg-white px-3 py-2 !text-gray-700 focus:ring-2 focus:outline-none",
      },
    },
  },

  datepicker: {
    root: {
      base: "relative",
      input: {
        base: "",
        field: {
          base: "!bg-white",
          icon: {
            base: "hidden",
            svg: "",
          },
          rightIcon: {
            base: "",
            svg: "",
          },
          input: {
            base: "!focus:ring-[#72CAEE] w-full rounded-lg border border-gray-400 !bg-white px-3 py-2 !text-gray-700 focus:ring-2 focus:outline-none",
          },
        },
      },
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2",
        inline: "relative top-0 z-auto",
        inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-white",
      },
      header: {
        base: "",
        title:
          "px-2 py-3 text-center font-semibold text-gray-900 dark:text-gray-900",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
            prev: "",
            next: "",
            view: "",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
          today:
            "bg-cyan-200 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-200",
          clear:
            "border border-gray-100 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title:
            "h-6 text-center text-sm leading-6 font-medium text-gray-500 dark:text-gray-400",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm leading-9 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
            selected:
              "bg-[#72CAEE] text-white hover:bg-cyan-600 dark:text-white",
            disabled: "text-gray-100",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm leading-9 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
            selected: "bg-cyan-200 text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm leading-9 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
            selected: "bg-cyan-200 text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm leading-9 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
            selected: "bg-cyan-200 text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
    },
  },
  drawer: {
    root: {
      base: "fixed z-[9999] overflow-y-auto bg-white p-4 transition-transform dark:bg-white",
      backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
      edge: "bottom-16",
      position: {
        top: {
          on: "top-0 right-0 left-0 w-full transform-none",
          off: "top-0 right-0 left-0 w-full -translate-y-full",
        },
        right: {
          on: "top-0 right-0 h-screen w-1/4 transform-none",
          off: "top-0 right-0 h-screen w-1/4 translate-x-full",
        },
        bottom: {
          on: "right-0 bottom-0 left-0 w-full transform-none",
          off: "right-0 bottom-0 left-0 w-full translate-y-full",
        },
        left: {
          on: "top-0 left-0 h-screen w-1/4 transform-none",
          off: "top-0 left-0 h-screen w-1/4 -translate-x-full",
        },
      },
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        closeIcon: "h-4 w-4",
        titleCloseIcon: "sr-only",
        titleIcon: "me-2.5 h-4 w-4",
        titleText:
          "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
      },
      collapsed: {
        on: "hidden",
        off: "block",
      },
    },
    items: {
      base: "",
    },
  },
});
