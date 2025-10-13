# 奇绩创业营 AI Office Hours 系统 - 前端代码说明

面向后端工程师的前端代码结构和接口对接指南。

---

## 📂 文件结构

```
UI_design/
├── index.html     # HTML 结构 (33 KB)
├── script.js      # JavaScript 交互逻辑 (34 KB)
└── styles.css     # CSS 样式 (25 KB)
```

---

## 🖥️ 界面功能 → 代码模块映射

### 1. 顶部导航栏

**功能**：品牌展示、新建项目、用户信息

**代码位置**：
- **HTML**：`index.html` 第 16-23 行
  ```html
  <header class="top-header">
      <div class="logo">奇绩创业营 AI Agent</div>
      <button class="btn-new-project">+ 新建项目</button>
      <div class="user-info">...</div>
  </header>
  ```
- **CSS**：`styles.css` 第 68-145 行 (`.top-header` 相关样式)
- **JS**：无特殊逻辑（按钮事件可在 `script.js` 中自行添加）

---

### 2. 左侧项目列表

**功能**：项目搜索、项目切换、状态标签

**代码位置**：
- **HTML**：`index.html` 第 27-82 行
  ```html
  <aside class="left-sidebar">
      <div class="search-box">...</div>
      <div class="project-list">
          <div class="project-item active">...</div>
      </div>
  </aside>
  ```
- **CSS**：`styles.css` 第 147-259 行 (`.left-sidebar` 相关样式)
- **JS**：`script.js` 第 30-47 行
  ```javascript
  function init() {
      // 初始化搜索功能
      // 初始化项目切换
  }
  ```

**后端对接点**：
- 需要提供**项目列表 API**：`GET /api/projects`
- 返回项目数组，包含：`id`, `name`, `subtitle`, `status`, `last_updated`

---

### 3. 主聊天区域

#### 3.1 对话流（核心功能）

**功能**：显示用户消息和 AI 判断，处理反馈

**代码位置**：
- **HTML**：`index.html` 第 86-396 行
  ```html
  <div class="chat-container">
      <!-- 文档卡片 -->
      <div class="timeline-item">...</div>

      <!-- 用户消息 -->
      <div class="message user-message">...</div>

      <!-- AI 回复（结构化判断） -->
      <div class="message ai-message">
          <div class="judgments-container">
              <div class="judgment-wrapper">...</div>
          </div>
      </div>
  </div>
  ```

- **CSS**：
  - 对话流布局：`styles.css` 第 261-370 行
  - 判断卡片：`styles.css` 第 902-1297 行
  - 用户消息：`styles.css` 第 372-461 行
  - AI 消息：`styles.css` 第 463-566 行

- **JS**：
  - 发送消息：`script.js` 第 93-117 行
    ```javascript
    function sendMessage() {
        // 获取用户输入
        // 显示用户消息
        // 调用 AI 生成判断
        // 显示 AI 回复
    }
    ```
  - 生成 AI 回复：`script.js` 第 175-377 行
    ```javascript
    function generateAIResponse(userMessage) {
        // 生成 3 个判断卡片的 HTML
        // 包含：标题、副标题、核心建议、问题本质、判断依据、执行路径
    }
    ```

**后端对接点**：
- **生成判断 API**：`POST /api/v1/judgments/generate`
  ```javascript
  // 请求示例（script.js 第 93-117 行可修改）
  const response = await fetch('/api/v1/judgments/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          project_name: "项目名称",
          project_description: "项目描述",
          current_issue: "用户问题"
      })
  });
  ```
- **期望返回格式**：
  ```json
  {
      "success": true,
      "data": {
          "session_id": "sess_xxx",
          "judgments": [
              {
                  "id": 1,
                  "title": "判断1标题",
                  "subtitle": "副标题",
                  "core_advice": "一句话建议",
                  "problem_essence": {
                      "real_problem": "真正的问题",
                      "core_conflict": "根本矛盾"
                  },
                  "judgment_basis": [
                      { "type": "verified", "content": "已验证的事实" },
                      { "type": "risk", "content": "风险点" }
                  ],
                  "execution_path": {
                      "steps": [
                          { "phase": "第1步", "action": "具体行动" }
                      ],
                      "contingency_plan": {
                          "bottom_line": "底线原则",
                          "scenarios": [
                              { "condition": "触发条件", "action": "应对措施" }
                          ]
                      }
                  },
                  "reference": "参考资料"
              }
          ]
      }
  }
  ```

#### 3.2 判断反馈功能

**功能**：用户可以采纳、拒绝或重新生成判断

**代码位置**：
- **HTML**：`index.html` 第 246-250 行（每个判断的操作按钮）
  ```html
  <div class="judgment-actions">
      <button class="btn-icon-only btn-accept" onclick="handleJudgmentAccept(1)">✓</button>
      <button class="btn-icon-only btn-reject" onclick="handleJudgmentReject(1)">✗</button>
      <button class="btn-icon-only btn-regenerate" onclick="handleJudgmentRegenerate(1)">🔄</button>
  </div>
  ```

- **JS**：
  - 采纳判断：`script.js` 第 573-596 行
    ```javascript
    function handleJudgmentAccept(judgmentId) {
        // 更新 UI（卡片变绿色，隐藏按钮）
        // 调用后端反馈 API
    }
    ```
  - 拒绝判断：`script.js` 第 598-621 行
    ```javascript
    function handleJudgmentReject(judgmentId) {
        // 更新 UI（卡片变红色）
        // 调用后端反馈 API
    }
    ```
  - 重新生成：`script.js` 第 623-641 行
    ```javascript
    function handleJudgmentRegenerate(judgmentId) {
        // 显示 Loading
        // 调用后端重新生成 API
        // 更新判断内容
    }
    ```

**后端对接点**：
- **提交反馈 API**：`POST /api/v1/judgments/feedback`
  ```javascript
  // 需要在上述函数中添加 API 调用
  await fetch('/api/v1/judgments/feedback', {
      method: 'POST',
      body: JSON.stringify({
          session_id: window.currentSessionId,
          judgment_id: judgmentId,
          action: 'accept' // 或 'reject'
      })
  });
  ```

- **重新生成 API**：`POST /api/v1/judgments/regenerate`
  ```javascript
  await fetch('/api/v1/judgments/regenerate', {
      method: 'POST',
      body: JSON.stringify({
          session_id: window.currentSessionId,
          judgment_id: judgmentId,
          feedback: "用户的修改建议（可选）"
      })
  });
  ```

#### 3.3 判断卡片折叠/展开

**功能**：默认折叠，点击展开详细内容

**代码位置**：
- **HTML**：`index.html` 第 143-245 行（判断卡片结构）
- **JS**：`script.js` 第 561-571 行
  ```javascript
  function toggleJudgment(judgmentId) {
      const content = document.getElementById(`judgment-content-${judgmentId}`);
      const icon = content.previousElementSibling.querySelector('.toggle-icon');

      if (content.style.display === 'none') {
          content.style.display = 'block';
          icon.textContent = '▲';
      } else {
          content.style.display = 'none';
          icon.textContent = '▼';
      }
  }
  ```

**注意**：纯前端功能，无需后端支持。

---

### 4. 右侧信息面板

#### 4.1 项目指标卡片

**功能**：显示关键业务数据

**代码位置**：
- **HTML**：`index.html` 第 323-334 行
  ```html
  <div class="info-section">
      <h4 class="section-subtitle">📊 近期增长</h4>
      <div class="metrics-grid">
          <div class="metric-item">
              <div class="metric-value">46K</div>
              <div class="metric-label">注册用户</div>
          </div>
      </div>
  </div>
  ```
- **CSS**：`styles.css` 第 681-747 行

**后端对接点**：
- 项目详情 API 应包含 `metrics` 字段：
  ```json
  {
      "metrics": {
          "registered_users": 46000,
          "mau": 39906,
          "arr": 382000
      }
  }
  ```

#### 4.2 OH 时间线（重要功能）

**功能**：点击 OH1/OH2/OH3 节点跳转到对应内容

**代码位置**：
- **HTML**：`index.html` 第 397-418 行
  ```html
  <div class="info-section">
      <h4 class="section-subtitle">Office Hours 时间线</h4>
      <div class="timeline-list">
          <div class="timeline-dot active" onclick="jumpToConversation('oh1')">
              <span class="dot-label">OH1</span>
              <span class="dot-date">2024-01-10</span>
          </div>
      </div>
  </div>
  ```

- **JS**：`script.js` 第 644-682 行
  ```javascript
  function jumpToConversation(ohId) {
      // 映射 OH ID 到 DOM 元素
      const ohMap = {
          'oh1': '.chat-container > .timeline-item:nth-of-type(4)',
          'oh2': '.chat-container > .timeline-item:nth-of-type(5)',
          'oh3': '.chat-container > .timeline-item:nth-of-type(6)',
          'oh4': null
      };

      // 平滑滚动到目标位置
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // 添加高亮动画
      targetElement.classList.add('conversation-highlight');
  }
  ```

- **CSS**：高亮动画 `styles.css` 第 1469-1492 行
  ```css
  .conversation-highlight {
      animation: highlightPulse 2s ease-in-out;
  }
  ```

**注意**：纯前端功能，无需后端支持。

---

### 5. 输入区域

**功能**：文本输入、附件上传、发送消息

**代码位置**：
- **HTML**：`index.html` 第 567-580 行
  ```html
  <div class="input-area">
      <textarea id="messageInput" placeholder="描述您的问题..."></textarea>
      <div class="input-actions">
          <button class="btn-attach">📎 附件</button>
          <button class="btn-send" onclick="sendMessage()">➤</button>
      </div>
  </div>
  ```

- **CSS**：`styles.css` 第 568-657 行
- **JS**：`script.js` 第 93-117 行（`sendMessage()` 函数）

**后端对接点**：
- 在 `sendMessage()` 函数中添加 API 调用（见上文"3.1 对话流"）

---

## 🔌 后端接口集成指南

### 步骤 1：修改 API 基础地址

在 `script.js` 文件顶部添加：
```javascript
// API 配置
const API_BASE_URL = 'http://your-backend-api.com/api/v1';
const REQUEST_TIMEOUT = 30000;
```

### 步骤 2：实现 API 请求封装

在 `script.js` 中添加统一的请求函数：
```javascript
async function apiRequest(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '请求失败');
        }

        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('请求超时，请稍后重试');
        }
        throw error;
    }
}
```

### 步骤 3：修改 sendMessage 函数

将 `script.js` 第 93-117 行的 `sendMessage()` 函数改为：
```javascript
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const projectName = document.getElementById('projectName').value.trim();
    const projectDescription = document.getElementById('projectDescription').value.trim();
    const userMessage = messageInput.value.trim();

    if (!userMessage) return;

    // 显示用户消息
    displayMessage(userMessage, 'user');
    messageInput.value = '';

    // 显示 Loading
    showLoading();

    try {
        // 调用后端 API
        const response = await apiRequest('/judgments/generate', {
            method: 'POST',
            body: JSON.stringify({
                project_name: projectName,
                project_description: projectDescription,
                current_issue: userMessage,
            }),
        });

        hideLoading();

        // 显示 AI 回复
        displayAIResponse(response.data);

        // 保存 session_id
        window.currentSessionId = response.data.session_id;

    } catch (error) {
        hideLoading();
        alert('请求失败：' + error.message);
    }
}
```

### 步骤 4：实现反馈 API 调用

在 `handleJudgmentAccept()` 函数中添加：
```javascript
async function handleJudgmentAccept(judgmentId) {
    // 更新 UI（已有代码）
    const wrapper = document.querySelector(`[data-judgment-id="${judgmentId}"]`).closest('.judgment-wrapper');
    const card = wrapper.querySelector('.judgment-card');
    card.classList.add('judgment-accepted');

    try {
        // 调用后端 API
        await apiRequest('/judgments/feedback', {
            method: 'POST',
            body: JSON.stringify({
                session_id: window.currentSessionId,
                judgment_id: judgmentId,
                action: 'accept',
            }),
        });
    } catch (error) {
        console.error('反馈提交失败:', error);
        alert('反馈提交失败：' + error.message);
    }
}
```

---

## 📊 数据流说明

### 用户发送消息流程
```
1. 用户输入问题，点击发送
   ↓
2. 前端调用 sendMessage() (script.js 第 93 行)
   ↓
3. 发送 POST /api/v1/judgments/generate
   ↓
4. 后端返回 3 个判断 + session_id
   ↓
5. 前端调用 generateAIResponse() 渲染判断卡片 (script.js 第 175 行)
   ↓
6. 保存 session_id 到 window.currentSessionId
```

### 判断反馈流程
```
1. 用户点击 [✓ 采纳] 按钮
   ↓
2. 前端调用 handleJudgmentAccept(judgmentId) (script.js 第 573 行)
   ↓
3. 立即更新 UI（卡片变绿色）
   ↓
4. 发送 POST /api/v1/judgments/feedback
   ↓
5. 后端记录反馈，用于 Prompt 优化
```

### OH 时间线跳转流程
```
1. 用户点击右侧 OH1 节点
   ↓
2. 前端调用 jumpToConversation('oh1') (script.js 第 644 行)
   ↓
3. 查找对应的 DOM 元素（第 4 个 .timeline-item）
   ↓
4. 平滑滚动到目标位置
   ↓
5. 添加 2 秒高亮动画
```

---

## 🎨 样式定制指南

### 修改主题色
编辑 `styles.css` 第 1-20 行，修改以下变量：
```css
/* 建议定义 CSS 变量 */
:root {
    --primary-color: #667eea;        /* 主色 */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --success-color: #2d8659;        /* 成功色 */
    --danger-color: #dc2626;         /* 错误色 */
    --warning-color: #f59e0b;        /* 警告色 */
}
```

### 调整布局宽度
- **左侧边栏**：`styles.css` 第 149 行 `width: 280px;`
- **右侧边栏**：`styles.css` 第 664 行 `width: 320px;`
- **文档宽度**：`styles.css` 第 279 行 `max-width: 500px;`
- **用户消息宽度**：`styles.css` 第 408 行 `max-width: 600px;`

---

## ✅ 功能测试清单

### 基础功能
- [ ] 页面加载正常，无控制台错误
- [ ] 输入框可以正常输入文字
- [ ] 点击发送按钮有响应

### 对话功能
- [ ] 用户消息显示在右侧
- [ ] AI 判断卡片显示在左侧
- [ ] 判断卡片可以折叠/展开
- [ ] 点击 [✓ 采纳] 卡片变绿色
- [ ] 点击 [✗ 不采纳] 卡片变红色

### OH 时间线
- [ ] 点击 OH1 跳转到 OH1 Prep 文档
- [ ] 点击 OH2 跳转到 OH2 Prep 文档
- [ ] 点击 OH3 跳转到 OH3 Prep 文档
- [ ] 点击 OH4 显示"尚未开始"提示
- [ ] 跳转后显示 2 秒高亮动画

### 样式检查
- [ ] 文档卡片靠右显示
- [ ] OH Badge 显示紫色渐变
- [ ] 悬停效果流畅
- [ ] 响应式布局正常

---

## 🐛 常见问题

### Q1: 如何修改 API 地址？
**A**: 在 `script.js` 顶部添加 `const API_BASE_URL = 'your-api-url';`

### Q2: session_id 存储在哪里？
**A**: 存储在全局变量 `window.currentSessionId`（`script.js` 第 117 行设置）

### Q3: 如何添加 Loading 动画？
**A**: 实现 `showLoading()` 和 `hideLoading()` 函数，在 `sendMessage()` 中调用

### Q4: 判断卡片的 HTML 结构在哪里？
**A**: 在 `generateAIResponse()` 函数中动态生成（`script.js` 第 175-377 行）

### Q5: 如何调试 OH 时间线跳转？
**A**: 打开浏览器控制台，查看 `jumpToConversation()` 函数的日志输出

---

## 📞 技术支持

- **前端代码问题**：查看本 README 对应章节
- **API 集成问题**：参考"后端接口集成指南"章节
- **样式定制问题**：参考"样式定制指南"章节

---

**版本**: v1.0.0
**最后更新**: 2024-10-13
**适用人群**: 后端工程师、全栈工程师
