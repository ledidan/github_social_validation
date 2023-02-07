const app = require("./app");

const request = {
  body: {
    phoneNumber: "1234567890",
  },
};

const response = {
  status: app.fn().mockReturnValue({
    send: app.fn(),
  }),
};

const db = {
  saveAccessCode: app.fn().mockResolvedValue({}),
};

const randomAccessCode = app.fn().mockReturnValue("123456");

test("CreateNewAccessCode", async () => {
  await CreateNewAccessCode(request, response, db, randomAccessCode);
  expect(db.saveAccessCode).toHaveBeenCalledWith("1234567890", "123456");
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.status().send).toHaveBeenCalledWith({
    message: "Access code saved and sent to 1234567890",
  });
});
