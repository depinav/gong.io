import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./tests/mocks/node.ts";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
