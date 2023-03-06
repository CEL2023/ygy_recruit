interface props {
  formContent: any;
  title: string;
  subTitle: string;
}
function FormView({ formContent, title, subTitle }: props) {
  return (
    <div>
      <div className="my-4 flex w-full flex-col space-y-2">
        <h1 className="text-center text-6xl font-bold">{title}</h1>
        <h2 className="text-center text-4xl font-semibold">{subTitle}</h2>
      </div>
      <div className="my-10 rounded-xl p-5 shadow-lg">
        {formContent.map((field: any, index: number) => {
          return (
            <div key={index}>
              <div className="flex items-center justify-between space-y-2">
                <div
                  key={field.id}
                  className="block text-sm font-medium capitalize "
                >
                  <label onClick={() => {}}>{field.question}</label>
                </div>
              </div>

              <div key={field.id} className="my-4">
                {field.type == "multiple" && (
                  <div className="my-4 flex flex-col space-y-2">
                    <fieldset>
                      <label className=" my-8">
                        최대 {field.maxSelect ?? 2}개
                      </label>
                      {field?.list?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="m-2 flex items-center rounded-lg border border-gray-200 pl-4 dark:border-gray-700"
                        >
                          <input
                            id={`${item}-checkbox-${index}`}
                            type="checkbox"
                            key={item}
                            value={item}
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                          <label
                            className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            htmlFor={`${item}-checkbox-${index}`}
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </fieldset>
                  </div>
                )}
                {field.type == "short" && (
                  <input
                    type="text"
                    className="shadow-xs block h-10 w-full rounded-md border px-5 text-black dark:bg-white"
                    placeholder={"답을 입력해주세요"}
                  />
                )}
                {field.type == "paragraph" && (
                  <textarea
                    rows={4}
                    className="block h-10 w-full rounded-md border px-5 py-2 text-black shadow-sm dark:bg-white"
                    placeholder={"답을 입력해주세요"}
                  />
                )}
                {field.type == "dropdown" && (
                  <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    {field?.list?.map((item: any) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FormView;
