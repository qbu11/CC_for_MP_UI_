// DOM Elements
const projectItems = document.querySelectorAll('.project-item');
const messageInput = document.querySelector('.message-input');
const btnSend = document.querySelector('.btn-send');
const chatContainer = document.querySelector('.chat-container');
const btnNewProject = document.querySelector('.btn-new-project');
const searchInput = document.querySelector('.search-input');
const btnModify = document.querySelector('.btn-modify');
const btnAccept = document.querySelector('.btn-accept');
const btnRegenerate = document.querySelector('.btn-regenerate');

// Project data structure
const projectsData = [
    {
        id: 1,
        name: "AI医疗诊断平台",
        subtitle: "基于深度学习的医疗影像诊断新系统",
        status: "进行中",
        date: "2024-01-15",
        timeline: [
            { type: "application", title: "项目申请表", date: "2024-01-10 提交" },
            { type: "dd", title: "DD材料", meta: "财务模型、市场分析、技术架构" },
            { type: "interview", title: "面试记录", date: "2024-01-12 技术面试、结构面试" }
        ],
        messages: [
            {
                type: "user",
                content: "我们的AI医疗诊断平台目前在技术实验阶段了，但遇到了数据标注量的问题。请帮我分析一下这个问题，并给出解决方案。",
                time: "2024-01-15 14:30"
            }
        ]
    },
    {
        id: 2,
        name: "智能物流系统",
        subtitle: "基于IoT的智能仓储管理",
        status: "首页",
        date: "2023-12-20",
        timeline: [],
        messages: []
    },
    {
        id: 3,
        name: "区块链金融",
        subtitle: "去中心化借贷平台",
        status: "已结束",
        date: "2023-11-30",
        timeline: [],
        messages: []
    }
];

let currentProjectId = 1;

// Initialize
function init() {
    setupEventListeners();
    autoResizeTextarea();
}

// Event Listeners
function setupEventListeners() {
    // Project selection
    projectItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectProject(index);
        });
    });

    // Send message
    btnSend.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // New project
    btnNewProject.addEventListener('click', createNewProject);

    // Search
    searchInput.addEventListener('input', (e) => {
        filterProjects(e.target.value);
    });

    // Feedback buttons
    btnAccept?.addEventListener('click', handleAccept);
    btnModify?.addEventListener('click', handleModify);
    btnRegenerate?.addEventListener('click', handleRegenerate);
}

// Project selection
function selectProject(index) {
    projectItems.forEach(item => item.classList.remove('active'));
    projectItems[index].classList.add('active');
    currentProjectId = index + 1;
    loadProjectData(projectsData[index]);
}

// Load project data
function loadProjectData(project) {
    // Update header
    document.querySelector('.project-title').textContent = project.name;

    // Clear and load chat container
    // In a real application, this would load from backend
    console.log('Loading project:', project.name);
}

// Send message
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addUserMessage(message);

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Simulate AI response
    setTimeout(() => {
        addAIResponse(message);
    }, 1000);
}

// Add user message
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';

    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    messageDiv.innerHTML = `
        <div>
            <div class="message-content">${escapeHtml(text)}</div>
            <div class="message-time">${timeString}</div>
        </div>
    `;

    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Add AI response
function addAIResponse(userMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';

    // Simulate AI analysis based on user input
    const response = generateAIResponse(userMessage);

    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-wrapper">
            <div class="message-header">
                <span class="ai-label">结构化分析</span>
            </div>
            <div class="message-content">
                ${response}
            </div>
        </div>
    `;

    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Generate AI response (simulation)
function generateAIResponse(userMessage) {
    // This is a simulation. In a real application, this would call the backend API
    // Generate 3 different judgments with collapsible content

    const judgments = [
        {
            id: 1,
            title: "判断1：问题不是技术能力，而是如何在有限资源下快速验证真实付费需求",
            subtitle: "不要盲目扩大数据标注规模，先用小样本验证商业模式",
            content: `
                <div class="judgment-content-inner">
                    <div class="core-advice">
                        <h5 class="advice-title">💡 一句话核心建议</h5>
                        <p class="advice-statement">先用现有数据验证付费客户，再扩标注量</p>
                    </div>

                    <div class="problem-essence">
                        <h5>🎯 问题本质判断</h5>
                        <p><strong>真正的问题：</strong>你们把"锅里"的问题(数据标注规模)当成了"碗里"的问题(是否有人愿意为现有准确率付费)。</p>
                        <p><strong>根本矛盾：</strong>在未验证商业模式之前，追求更高准确率是资源错配——应该先用现有95%准确率去找愿意付费的细分场景，验证PMF，再决定是否需要更多数据。</p>
                    </div>

                    <div class="judgment-basis">
                        <h5>📊 核心判断依据</h5>
                        <ul class="basis-list">
                            <li><span class="icon-verified">✅</span> 技术基础已验证：95%准确率已达行业中上水平</li>
                            <li><span class="icon-risk">❌</span> 商业模式未验证：无真实付费客户和收入</li>
                            <li><span class="icon-risk">❌</span> 需求场景模糊：不清楚谁会为此付多少钱</li>
                            <li><span class="icon-warning">⚠️</span> 资源极度受限：团队规模、现金流、时间窗口</li>
                            <li><span class="icon-warning">⚠️</span> 标注成本高昂：医疗数据标注单价高且周期长</li>
                        </ul>
                    </div>

                    <div class="execution-path">
                        <h5>🚀 执行路径</h5>
                        <div class="path-steps">
                            <div class="step-item">
                                <strong>第1步 (本周内)：</strong>冻结新标注计划，盘点现有标注数据可支撑的病种和场景。确定3-5个最有商业价值的细分场景(如肺结节筛查、糖尿病视网膜病变)。
                            </div>
                            <div class="step-item">
                                <strong>第2步 (未来2周)：</strong>针对选定场景，接触10-15家目标医院/体检中心，做深度需求访谈。关键问题：现有准确率是否满足他们需求？愿意为此支付的价格区间？采购决策流程和周期？
                            </div>
                            <div class="step-item">
                                <strong>第3步 (第3-4周)：</strong>若有2家以上明确付费意向，立即启动POC(概念验证)合作，签订试点协议。若无明确意向，重新审视产品定位，考虑是否需要调整目标场景或商业模式。
                            </div>
                        </div>

                        <div class="contingency-plan">
                            <h5>⚠️ 情况预案</h5>
                            <p class="bottom-line"><strong>底线原则：</strong>在获得至少1个真实付费承诺(签约金额≥50万)之前，绝不投入超过现有20%资源用于扩大数据标注。</p>
                            <ul class="scenario-list">
                                <li><strong>若客户反馈准确率不够：</strong>不要立即扩标注，先问清楚"够"的标准是多少？差距有多大？是否愿意为更高准确率额外付费？</li>
                                <li><strong>若没有付费意向：</strong>立即停止当前方向，回到问题本质——重新寻找真正愿意为AI诊断付费的场景，可能需要转向2B2C模式或调整病种。</li>
                                <li><strong>若资金即将耗尽：</strong>优先保留核心技术团队，暂停标注外包，用现有资产(技术、数据、团队)寻找快速变现机会(如技术服务、数据标注服务)。</li>
                            </ul>
                        </div>
                    </div>

                    <p class="reference">📖 参考：陆奇创业方法论 - 「碗里/锅里/田里」框架、PMF验证清单</p>
                </div>
            `
        },
        {
            id: 2,
            title: "判断2：真正的风险是时间窗口，医疗AI赛道正在快速收窄",
            subtitle: "必须在6个月内找到可复制的商业模式，否则将失去融资机会",
            content: `
                <div class="judgment-content-inner">
                    <div class="core-advice">
                        <h5 class="advice-title">💡 一句话核心建议</h5>
                        <p class="advice-statement">锁定单一场景，6个月内签3家付费客户</p>
                    </div>

                    <div class="problem-essence">
                        <h5>🎯 问题本质判断</h5>
                        <p><strong>真正的问题：</strong>你们陷入了"技术完美主义陷阱"——把有限的时间和资源用于提升技术指标，而非验证商业模式。</p>
                        <p><strong>根本矛盾：</strong>医疗AI的窗口期正在关闭(大厂布局、政策收紧、客户教育成本高)，你们没有时间追求完美产品，必须用"够用"的产品快速占领细分市场。</p>
                    </div>

                    <div class="judgment-basis">
                        <h5>📊 核心判断依据</h5>
                        <ul class="basis-list">
                            <li><span class="icon-verified">✅</span> 赛道有需求：医疗影像诊断市场规模大且增长快</li>
                            <li><span class="icon-risk">❌</span> 竞争加剧：腾讯、阿里、科大讯飞等已深度布局</li>
                            <li><span class="icon-risk">❌</span> 客户决策周期长：医院采购流程复杂，需6-12个月</li>
                            <li><span class="icon-warning">⚠️</span> 现金流紧张：按当前烧钱速度，跑道不足12个月</li>
                            <li><span class="icon-warning">⚠️</span> 监管政策不确定：NMPA认证周期长且要求高</li>
                        </ul>
                    </div>

                    <div class="execution-path">
                        <h5>🚀 执行路径</h5>
                        <div class="path-steps">
                            <div class="step-item">
                                <strong>第1步 (第1个月)：</strong>聚焦单一病种+单一客户类型。建议选择：肺结节筛查+民营体检中心(决策快、付费能力强)。放弃其他所有方向，ALL IN这个场景。
                            </div>
                            <div class="step-item">
                                <strong>第2步 (第2-3个月)：</strong>用现有产品快速签约1-2家标杆客户，哪怕降价甚至免费试用。关键是拿到真实使用数据和客户背书，形成可复制的销售打法。
                            </div>
                            <div class="step-item">
                                <strong>第3步 (第4-6个月)：</strong>基于标杆案例，复制3-5家付费客户。同步启动A轮融资准备，核心数据：客户数量、续约率、客单价、毛利率。目标估值：8000万-1亿。
                            </div>
                        </div>

                        <div class="contingency-plan">
                            <h5>⚠️ 情况预案</h5>
                            <p class="bottom-line"><strong>底线原则：</strong>若3个月内无法签下首个付费客户(金额≥30万/年)，立即调整方向或考虑并购退出。</p>
                            <ul class="scenario-list">
                                <li><strong>若首个客户难签约：</strong>分析根本原因——是价格太高？准确率不够？还是采购流程问题？针对性调整，必要时降价换市场。</li>
                                <li><strong>若融资困难：</strong>优先考虑战略投资者(医疗集团、影像设备商)，用业务协同换取资金和渠道，估值可以适当妥协。</li>
                                <li><strong>若政策突变：</strong>立即评估合规成本和时间，若NMPA认证周期超过12个月，转向不需要认证的辅助诊断场景(如健康管理、体检报告解读)。</li>
                            </ul>
                        </div>
                    </div>

                    <p class="reference">📖 参考：融资节奏把控、早期客户开发策略</p>
                </div>
            `
        },
        {
            id: 3,
            title: "判断3：团队能力与目标错配，需要立即补充商业化人才",
            subtitle: "技术团队无法独自完成商业验证，必须引入有医疗行业销售经验的合伙人",
            content: `
                <div class="judgment-content-inner">
                    <div class="core-advice">
                        <h5 class="advice-title">💡 一句话核心建议</h5>
                        <p class="advice-statement">2周内锁定医疗销售合伙人，给20%股权</p>
                    </div>

                    <div class="problem-essence">
                        <h5>🎯 问题本质判断</h5>
                        <p><strong>真正的问题：</strong>你们是技术驱动团队，擅长"做产品"，但医疗AI的核心壁垒在"卖产品"(客户关系、政策合规、商业模式设计)。</p>
                        <p><strong>根本矛盾：</strong>当前团队构成(3个技术背景创始人)无法独立完成商业化验证，继续由技术团队主导商业决策，会持续犯"用技术思维解决商业问题"的错误。</p>
                    </div>

                    <div class="judgment-basis">
                        <h5>📊 核心判断依据</h5>
                        <ul class="basis-list">
                            <li><span class="icon-verified">✅</span> 技术能力强：团队AI/算法背景扎实</li>
                            <li><span class="icon-risk">❌</span> 商业能力弱：无医疗行业销售经验和客户资源</li>
                            <li><span class="icon-risk">❌</span> 决策偏技术：过度关注技术指标，忽视商业本质</li>
                            <li><span class="icon-warning">⚠️</span> 学习成本高：从零摸索医疗行业销售需要1-2年</li>
                            <li><span class="icon-warning">⚠️</span> 机会窗口窄：团队没有时间边学边做</li>
                        </ul>
                    </div>

                    <div class="execution-path">
                        <h5>🚀 执行路径</h5>
                        <div class="path-steps">
                            <div class="step-item">
                                <strong>第1步 (本周)：</strong>明确合伙人画像：10年以上医疗行业经验、有成功销售大单经历(单笔≥500万)、有医院院长/科室主任级别人脉、认同创业、愿意降薪加入。
                            </div>
                            <div class="step-item">
                                <strong>第2步 (未来2周)：</strong>通过多渠道寻找候选人(投资人推荐、猎头、行业峰会、LinkedIn)，快速面试5-10人。核心考察：人脉资源(能否立即对接3家以上意向客户)、销售能力(讲清楚如何在3个月内签单)。
                            </div>
                            <div class="step-item">
                                <strong>第3步 (第3-4周)：</strong>确定合伙人后，给予15-20%股权+销售提成激励。明确分工：合伙人全权负责商业化(客户开发、合同谈判、融资路演)，技术团队专注产品交付和迭代。建立每周同步机制，确保信息对齐。
                            </div>
                        </div>

                        <div class="contingency-plan">
                            <h5>⚠️ 情况预案</h5>
                            <p class="bottom-line"><strong>底线原则：</strong>若1个月内找不到合适合伙人，立即聘请有医疗行业经验的顾问(月薪5-8万+期权)，同时CEO必须全职投入商业化。</p>
                            <ul class="scenario-list">
                                <li><strong>若股权谈不拢：</strong>可以考虑分期释放股权(首年5%，达成业绩目标后追加10-15%)，或给予更高现金激励(销售额5-10%提成)。</li>
                                <li><strong>若合伙人能力不匹配：</strong>设置3个月试用期，明确考核指标(对接意向客户数、签约金额)。若未达标，果断调整，不要因为人情拖延决策。</li>
                                <li><strong>若无法招到合适人选：</strong>考虑调整商业模式——转向技术服务(为大厂或医院提供定制化算法开发)，利用现有技术能力快速变现，为长期发展争取时间。</li>
                            </ul>
                        </div>
                    </div>

                    <p class="reference">📖 参考：创始团队搭建原则、早期股权分配方案</p>
                </div>
            `
        }
    ];

    let html = '<div class="judgments-container">';

    judgments.forEach((judgment, index) => {
        html += `
            <div class="judgment-wrapper">
                <div class="judgment-card" data-judgment-id="${judgment.id}">
                    <div class="judgment-header" onclick="toggleJudgment(${judgment.id})">
                        <div class="judgment-header-left">
                            <h4 class="judgment-title">${judgment.title}</h4>
                            <p class="judgment-subtitle">${judgment.subtitle}</p>
                        </div>
                        <div class="judgment-toggle">
                            <span class="toggle-icon">▼</span>
                        </div>
                    </div>
                    <div class="judgment-content" id="judgment-content-${judgment.id}" style="display: none;">
                        ${judgment.content}
                    </div>
                </div>
                <div class="judgment-actions">
                    <button class="btn-icon-only btn-accept" onclick="handleJudgmentAccept(${judgment.id})" title="采纳此判断">✓</button>
                    <button class="btn-icon-only btn-reject" onclick="handleJudgmentReject(${judgment.id})" title="不采纳此判断">✗</button>
                    <button class="btn-icon-only btn-regenerate" onclick="handleJudgmentRegenerate(${judgment.id})" title="重新生成此判断">🔄</button>
                </div>
            </div>
        `;
    });

    html += '</div>';

    // Add project context section at the end
    html += `
        <div class="project-context-section">
            <h3 class="context-title">📋 项目上下文</h3>
            <div class="context-content">
                <h4 class="project-name-context">StudySpace - AI驱动的成长关系匹配平台</h4>
                <p class="project-desc">用AI精准匹配最合适的导师和成长搭子,即时视频通话,帮助年轻人找到个性化成长路径。长期愿景是替代僵硬教育体系,打造"为每个人量身定制的学校"。</p>

                <div class="context-block">
                    <h5>创始团队</h5>
                    <p><strong>彭麟雅</strong>(CEO/Founder) 剑桥大学经济系本科;bilibili 150万粉丝学习类内容创作者(150M+总播放量);大学期间从0到1打造$1.5M营收电商品牌(产品登顶京东文具销售额全国第一);2020年起手动撮合6400+次导师学生匹配,深度理解用户需求。</p>
                    <p><strong>技术亮点</strong>: 基于LiveKit低延时WebRTC部署+LLM向量匹配+语义搜索,保证&lt;200ms视频通话延迟和精准推荐。</p>
                    <p><strong>个人优势</strong>: 深度理解Z世代需求(自己就是重度用户),强执行力(摔断腿后5天做手术次日继续工作),跨界能力(内容创作+产品+运营+BD全栈)。</p>
                    <p><strong>短板</strong>: 团队只有2人(1位全职工程师),缺乏校园BD经验,技术深度有限(依赖开源方案)。</p>
                    <p><strong>其他创始人</strong>: 1位全职工程师(负责前端+后端开发)</p>
                    <p>目前<strong>2人全职团队</strong>(创始人+1位工程师),正在招聘产品经理和增长负责人</p>
                </div>

                <div class="context-block">
                    <h5>项目进展 (2025年10月)</h5>
                    <ul class="context-metrics">
                        <li><strong>产品阶段</strong>: MVP已上线(Web端),APP开发中,导师市集功能迭代中</li>
                        <li><strong>用户数</strong>: 46,000总注册,39,906 MAU,3,700付费用户</li>
                        <li><strong>营收</strong>: $382K ARR(bootstrap,0广告投放),50% MoM增长,9月单月营收¥101,580(导师匹配¥76,580+会员¥25,000)</li>
                        <li><strong>留存</strong>: D1/D7/D30: 68%/33%/18%(无APP/无push,纯Web端MVP)</li>
                        <li><strong>重度用户</strong>: 1,348人(周均2小时+),平均20.95个朋友,77.74%付费率,人均付费¥116.64</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    return html;
}

// Feedback handlers
function handleAccept(button) {
    const messageWrapper = button.closest('.message-wrapper');
    const feedbackSection = button.closest('.feedback-section');

    // Add accepted indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = 'margin-top: 12px; padding: 8px 12px; background: #e6f7e6; color: #2d8659; border-radius: 6px; font-size: 13px;';
    indicator.innerHTML = '✓ 已采纳此建议';

    feedbackSection.replaceWith(indicator);

    // In a real application, this would send feedback to backend
    console.log('Feedback accepted');
}

function handleModify(button) {
    const messageWrapper = button.closest('.message-wrapper');
    const feedbackSection = button.closest('.feedback-section');

    // Check if feedback form already exists
    if (messageWrapper.querySelector('.monitor-feedback')) {
        return;
    }

    // Create feedback form
    const feedbackForm = document.createElement('div');
    feedbackForm.className = 'monitor-feedback';
    feedbackForm.style.display = 'block';
    feedbackForm.innerHTML = `
        <div class="feedback-header">
            <span class="monitor-icon">👨‍🏫</span>
            <span class="monitor-label">班主任反馈</span>
        </div>
        <textarea class="feedback-input" placeholder="请输入您的修改建议，AI将根据此反馈改进提示词..."></textarea>
        <div class="feedback-actions">
            <button class="btn-submit-feedback" onclick="submitFeedback(this)">提交反馈</button>
            <button class="btn-cancel-feedback" onclick="cancelFeedback(this)">取消</button>
        </div>
    `;

    feedbackSection.after(feedbackForm);
    feedbackForm.querySelector('.feedback-input').focus();
}

function handleRegenerate(button) {
    const messageWrapper = button.closest('.message-wrapper');
    const messageContent = messageWrapper.querySelector('.message-content');

    // Show loading state
    const originalContent = messageContent.innerHTML;
    messageContent.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">🔄 正在重新生成...</div>';

    // Simulate regeneration
    setTimeout(() => {
        messageContent.innerHTML = originalContent;
        // In a real application, this would call the backend API for regeneration
        console.log('Regenerating response...');
    }, 1500);
}

// Submit feedback
function submitFeedback(button) {
    const feedbackForm = button.closest('.monitor-feedback');
    const feedbackText = feedbackForm.querySelector('.feedback-input').value.trim();

    if (!feedbackText) {
        alert('请输入反馈内容');
        return;
    }

    // In a real application, this would send feedback to backend for prompt improvement
    console.log('Feedback submitted:', feedbackText);

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'margin-top: 12px; padding: 8px 12px; background: #fff7e6; color: #d97706; border-radius: 6px; font-size: 13px;';
    successMsg.innerHTML = '✓ 反馈已提交，AI将根据您的建议改进';

    feedbackForm.replaceWith(successMsg);

    // Simulate backend processing
    setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => successMsg.remove(), 300);
    }, 3000);
}

// Cancel feedback
function cancelFeedback(button) {
    const feedbackForm = button.closest('.monitor-feedback');
    feedbackForm.style.opacity = '0';
    setTimeout(() => feedbackForm.remove(), 300);
}

// Create new project
function createNewProject() {
    const projectName = prompt('请输入项目名称：');
    if (!projectName) return;

    // In a real application, this would create a new project via backend API
    console.log('Creating new project:', projectName);
    alert(`项目 "${projectName}" 已创建！`);
}

// Filter projects
function filterProjects(query) {
    projectItems.forEach(item => {
        const projectName = item.querySelector('.project-name').textContent;
        const projectSubtitle = item.querySelector('.project-subtitle').textContent;

        if (projectName.includes(query) || projectSubtitle.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Auto-resize textarea
function autoResizeTextarea() {
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
}

// Scroll to bottom
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle judgment card
function toggleJudgment(judgmentId) {
    const content = document.getElementById(`judgment-content-${judgmentId}`);
    const card = document.querySelector(`[data-judgment-id="${judgmentId}"]`);
    const toggleIcon = card.querySelector('.toggle-icon');

    if (content.style.display === 'none') {
        // Expand
        content.style.display = 'block';
        toggleIcon.style.transform = 'rotate(180deg)';
        card.classList.add('expanded');
    } else {
        // Collapse
        content.style.display = 'none';
        toggleIcon.style.transform = 'rotate(0deg)';
        card.classList.remove('expanded');
    }
}

// Individual judgment feedback handlers
function handleJudgmentAccept(judgmentId) {
    const wrapper = document.querySelector(`[data-judgment-id="${judgmentId}"]`).closest('.judgment-wrapper');
    const card = wrapper.querySelector('.judgment-card');
    const actions = wrapper.querySelector('.judgment-actions');

    // Add accepted class to card
    card.classList.add('judgment-accepted');
    card.classList.remove('judgment-rejected');

    // Hide action buttons
    actions.style.display = 'none';

    // Add status indicator
    if (!card.querySelector('.status-badge')) {
        const badge = document.createElement('span');
        badge.className = 'status-badge status-accepted';
        badge.innerHTML = '✓ 已采纳';
        card.querySelector('.judgment-header').appendChild(badge);
    }

    // In a real application, this would send feedback to backend
    console.log(`Judgment ${judgmentId} accepted`);
}

function handleJudgmentReject(judgmentId) {
    const wrapper = document.querySelector(`[data-judgment-id="${judgmentId}"]`).closest('.judgment-wrapper');
    const card = wrapper.querySelector('.judgment-card');
    const actions = wrapper.querySelector('.judgment-actions');

    // Show rejection reason input
    const feedbackPrompt = prompt('请简述不采纳的原因（可选）：');

    // Add rejected class to card
    card.classList.add('judgment-rejected');
    card.classList.remove('judgment-accepted');

    // Hide action buttons
    actions.style.display = 'none';

    // Add status indicator
    if (!card.querySelector('.status-badge')) {
        const badge = document.createElement('span');
        badge.className = 'status-badge status-rejected';
        badge.innerHTML = '✗ 未采纳';
        card.querySelector('.judgment-header').appendChild(badge);
    }

    // In a real application, this would send feedback to backend
    console.log(`Judgment ${judgmentId} rejected`, feedbackPrompt ? `Reason: ${feedbackPrompt}` : '');
}

function handleJudgmentRegenerate(judgmentId) {
    const card = document.querySelector(`[data-judgment-id="${judgmentId}"]`);
    const contentInner = card.querySelector('.judgment-content-inner');

    if (!contentInner) return;

    // Show loading state
    const originalContent = contentInner.innerHTML;
    contentInner.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">🔄 正在重新生成此判断...</div>';

    // Simulate regeneration
    setTimeout(() => {
        contentInner.innerHTML = originalContent;
        // In a real application, this would call the backend API for regeneration
        console.log(`Regenerating judgment ${judgmentId}...`);
    }, 1500);
}

// Jump to specific conversation by OH number
function jumpToConversation(ohId) {
    // Map OH IDs to timeline items/messages in the chat container
    // Structure: 申请表(1) / DD材料(2) / 面试记录(3) / OH1 Prep(4) / OH1 Q&A(5,6) / OH2 Prep(7) / OH2 Q&A(8,9) / OH3 Prep(10) / OH3 Q&A(11,12)
    const ohMap = {
        'oh1': '.chat-container > .timeline-item:nth-of-type(4)', // OH1 Prep
        'oh2': '.chat-container > .timeline-item:nth-of-type(5)', // OH2 Prep
        'oh3': '.chat-container > .timeline-item:nth-of-type(6)', // OH3 Prep
        'oh4': null  // OH4 尚未开始
    };

    const selector = ohMap[ohId];

    if (!selector) {
        alert('OH4 尚未开始，敬请期待！');
        return;
    }

    const targetElement = document.querySelector(selector);

    if (targetElement) {
        // Smooth scroll to target
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });

        // Add highlight effect
        targetElement.classList.add('conversation-highlight');

        // Remove highlight after animation
        setTimeout(() => {
            targetElement.classList.remove('conversation-highlight');
        }, 2000);
    } else {
        console.error(`Cannot find element for ${ohId}. Selector: ${selector}`);
    }
}

// Make functions globally available
window.handleAccept = handleAccept;
window.handleModify = handleModify;
window.handleRegenerate = handleRegenerate;
window.submitFeedback = submitFeedback;
window.cancelFeedback = cancelFeedback;
window.toggleJudgment = toggleJudgment;
window.handleJudgmentAccept = handleJudgmentAccept;
window.handleJudgmentReject = handleJudgmentReject;
window.handleJudgmentRegenerate = handleJudgmentRegenerate;
window.jumpToConversation = jumpToConversation;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendMessage,
        addUserMessage,
        addAIResponse,
        handleAccept,
        handleModify,
        handleRegenerate,
        submitFeedback,
        cancelFeedback
    };
}
